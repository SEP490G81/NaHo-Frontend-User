"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import {
    cancelPaymentOrder,
    getMyPaymentOrders,
} from "@/services/client/payment.service";
import {
    PaymentOrderResponse,
    PaymentOrderStatus,
} from "@/types/responses/payment.response";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Skeleton from "@mui/material/Skeleton";

import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

import { ContainerBox } from "@/components/ui/container.box";

const getEffectiveStatus = (
    order: PaymentOrderResponse,
    currentTime: number,
): PaymentOrderStatus => {
    if (order.status === "PENDING" && order.expiresTime) {
        const expiresAt = new Date(order.expiresTime).getTime();
        if (!isNaN(expiresAt) && expiresAt <= currentTime) {
            return "EXPIRED";
        }
    }
    return order.status;
};

const OrdersList: React.FC = () => {
    const t = useTranslations("settings.orders");

    const [orders, setOrders] = useState<PaymentOrderResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [now, setNow] = useState<number>(Date.now());

    // Status filter state
    const [statusFilter, setStatusFilter] = useState<string>("ALL");

    // Cancel modal state
    const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
    const [orderToCancel, setOrderToCancel] = useState<string | null>(null);
    const [cancelling, setCancelling] = useState<boolean>(false);

    const fetchOrders = async (silent: boolean = false) => {
        if (!silent) setLoading(true);
        try {
            const data = await getMyPaymentOrders();
            // Sort by creation time descending (newest first)
            const sorted = [...data].sort(
                (a, b) =>
                    new Date(b.createdTime).getTime() -
                    new Date(a.createdTime).getTime(),
            );
            setOrders(sorted);
        } catch (err: any) {
            if (!silent) {
                console.error("Failed to load payment orders:", err);
                toast.error(
                    err.message || "Không thể lấy danh sách lịch sử giao dịch.",
                );
            }
        } finally {
            if (!silent) setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();

        // Real-time ticker to auto expire orders client-side when time passes
        const timer = setInterval(() => {
            setNow(Date.now());
        }, 3000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const handleContinuePayment = (order: PaymentOrderResponse) => {
        let paymentUrl = order.paymentUrl;

        // Try reading saved paymentUrl from localStorage
        if (!paymentUrl) {
            try {
                const savedUrls = JSON.parse(
                    localStorage.getItem("naho_payment_urls") || "{}",
                );
                paymentUrl = savedUrls[order.orderCode];
            } catch (e) {
                console.error(
                    "Failed to read paymentUrl from localStorage:",
                    e,
                );
            }
        }

        if (paymentUrl) {
            window.open(paymentUrl, "_blank");
        } else {
            toast.warning(
                "Không tìm thấy đường dẫn thanh toán cũ. Vui lòng thử tạo giao dịch mới.",
            );
        }
    };

    const handleOpenCancelDialog = (orderCode: string) => {
        setOrderToCancel(orderCode);
        setCancelDialogOpen(true);
    };

    const handleConfirmCancel = async () => {
        if (!orderToCancel) return;
        setCancelling(true);
        try {
            await cancelPaymentOrder(orderToCancel);
            toast.success(t("cancelSuccess"));
            setCancelDialogOpen(false);
            setOrderToCancel(null);
            fetchOrders();
        } catch (err: any) {
            toast.error(err.message || t("cancelFailed"));
        } finally {
            setCancelling(false);
        }
    };

    const getStatusChip = (status: PaymentOrderStatus) => {
        switch (status) {
            case "PAID":
                return (
                    <Chip
                        label={t("statusPaid")}
                        color="success"
                        size="small"
                        className="font-bold"
                    />
                );
            case "PENDING":
                return (
                    <Chip
                        label={t("statusPending")}
                        color="warning"
                        size="small"
                        className="animate-pulse font-bold"
                    />
                );
            case "CANCELLED":
                return (
                    <Chip
                        label={t("statusCancelled")}
                        color="default"
                        size="small"
                        className="font-semibold text-gray-500"
                    />
                );
            case "EXPIRED":
                return (
                    <Chip
                        label={t("statusExpired")}
                        color="error"
                        size="small"
                        className="font-semibold"
                    />
                );
            default:
                return <Chip label={status} size="small" />;
        }
    };

    const processedOrders = orders.map((order) => ({
        ...order,
        effectiveStatus: getEffectiveStatus(order, now),
    }));

    const filterTabs = [
        { key: "ALL", label: "Tất cả", count: processedOrders.length },
        {
            key: "PAID",
            label: t("statusPaid"),
            count: processedOrders.filter((o) => o.effectiveStatus === "PAID")
                .length,
        },
        {
            key: "PENDING",
            label: t("statusPending"),
            count: processedOrders.filter(
                (o) => o.effectiveStatus === "PENDING",
            ).length,
        },
        {
            key: "CANCELLED",
            label: t("statusCancelled"),
            count: processedOrders.filter(
                (o) => o.effectiveStatus === "CANCELLED",
            ).length,
        },
        {
            key: "EXPIRED",
            label: t("statusExpired"),
            count: processedOrders.filter(
                (o) => o.effectiveStatus === "EXPIRED",
            ).length,
        },
    ];

    const filteredOrders =
        statusFilter === "ALL"
            ? processedOrders
            : processedOrders.filter((o) => o.effectiveStatus === statusFilter);

    if (loading) {
        return (
            <div className="space-y-4">
                <Skeleton
                    variant="rectangular"
                    height={50}
                    className="rounded-xl"
                />
                <Skeleton
                    variant="rectangular"
                    height={50}
                    className="rounded-xl"
                />
                <Skeleton
                    variant="rectangular"
                    height={50}
                    className="rounded-xl"
                />
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <ContainerBox className="border-bdc-primary flex flex-col items-center justify-center border text-center">
                <ReceiptLongOutlinedIcon className="text-text-muted mb-3 text-6xl opacity-40" />
                <p className="text-text-primary text-base font-semibold">
                    {t("noOrders")}
                </p>
            </ContainerBox>
        );
    }

    return (
        <div className="space-y-5">
            {/* Centered Status Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2">
                {filterTabs.map((tab) => {
                    const isSelected = statusFilter === tab.key;
                    return (
                        <button
                            key={tab.key}
                            onClick={() => setStatusFilter(tab.key)}
                            className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-200 ${
                                isSelected
                                    ? "scale-105 bg-gray-900 font-bold text-white shadow-sm dark:bg-gray-100 dark:text-gray-900"
                                    : "bg-hbgc-app hover:bg-primary/10 text-text-contrast hover:text-primary border-bdc-primary border"
                            }`}
                        >
                            {tab.label} ({tab.count})
                        </button>
                    );
                })}
            </div>

            {filteredOrders.length === 0 ? (
                <ContainerBox className="border-bdc-primary/40 text-text-muted border text-center text-sm font-medium">
                    Không có đơn hàng nào thuộc trạng thái này.
                </ContainerBox>
            ) : (
                <TableContainer
                    component={Paper}
                    elevation={0}
                    className="border-bdc-primary overflow-hidden rounded-xl border"
                >
                    <Table
                        sx={{
                            minWidth: "100%",
                            "& .MuiTableCell-root": { px: 1.5, py: 1.5 },
                        }}
                        aria-label="payment orders table"
                    >
                        <TableHead className="bg-bgc-subtle">
                            <TableRow>
                                <TableCell
                                    align="center"
                                    className="text-text-primary font-bold whitespace-nowrap"
                                >
                                    {t("orderCode")}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    className="text-text-primary font-bold whitespace-nowrap"
                                >
                                    {t("amount")}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    className="text-text-primary font-bold whitespace-nowrap"
                                >
                                    {t("provider")}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    className="text-text-primary font-bold whitespace-nowrap"
                                >
                                    {t("status")}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    className="text-text-primary font-bold whitespace-nowrap"
                                >
                                    {t("createdTime")}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    className="text-text-primary font-bold whitespace-nowrap"
                                >
                                    {t("actions")}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredOrders.map((order) => (
                                <TableRow
                                    key={order.id || order.orderCode}
                                    className="hover:bg-bgc-subtle/50 transition-colors"
                                >
                                    <TableCell
                                        align="center"
                                        className="text-text-primary font-mono font-medium whitespace-nowrap"
                                    >
                                        {order.orderCode}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        className="text-primary font-bold whitespace-nowrap"
                                    >
                                        {new Intl.NumberFormat("vi-VN").format(
                                            order.amount,
                                        )}{" "}
                                        {order.currency}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        className="text-text-contrast text-xs font-medium whitespace-nowrap sm:text-sm"
                                    >
                                        {order.provider}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        className="whitespace-nowrap"
                                    >
                                        {getStatusChip(order.effectiveStatus)}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        className="text-text-contrast/80 text-xs font-medium whitespace-nowrap"
                                    >
                                        {new Date(
                                            order.createdTime,
                                        ).toLocaleString("vi-VN", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        className="whitespace-nowrap"
                                    >
                                        {order.effectiveStatus === "PENDING" ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    color="primary"
                                                    startIcon={
                                                        <PaymentOutlinedIcon fontSize="small" />
                                                    }
                                                    onClick={() =>
                                                        handleContinuePayment(
                                                            order,
                                                        )
                                                    }
                                                    className="text-xs font-bold whitespace-nowrap normal-case shadow-sm"
                                                >
                                                    {t("continuePayment")}
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    color="error"
                                                    startIcon={
                                                        <CancelOutlinedIcon fontSize="small" />
                                                    }
                                                    onClick={() =>
                                                        handleOpenCancelDialog(
                                                            order.orderCode,
                                                        )
                                                    }
                                                    className="text-xs font-semibold whitespace-nowrap normal-case"
                                                >
                                                    {t("cancelOrder")}
                                                </Button>
                                            </div>
                                        ) : (
                                            <span className="text-text-muted text-xs font-medium">
                                                -
                                            </span>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Cancel Confirmation Dialog */}
            <Dialog
                open={cancelDialogOpen}
                onClose={() => !cancelling && setCancelDialogOpen(false)}
                maxWidth="xs"
                fullWidth
                slotProps={{
                    paper: {
                        style: {
                            borderRadius: 16,
                            padding: 8,
                        },
                    },
                }}
            >
                <DialogTitle className="text-text-primary text-lg font-bold">
                    {t("confirmCancelTitle")}
                </DialogTitle>
                <DialogContent>
                    <p className="text-text-muted text-sm">
                        {t("confirmCancelMessage", {
                            orderCode: orderToCancel || "",
                        })}
                    </p>
                </DialogContent>
                <DialogActions className="p-4 pt-2">
                    <Button
                        onClick={() => setCancelDialogOpen(false)}
                        disabled={cancelling}
                        color="inherit"
                        className="font-medium normal-case"
                    >
                        Hủy bỏ
                    </Button>
                    <Button
                        onClick={handleConfirmCancel}
                        disabled={cancelling}
                        color="error"
                        variant="contained"
                        startIcon={
                            cancelling ? (
                                <CircularProgress size={16} color="inherit" />
                            ) : null
                        }
                        className="font-bold normal-case shadow"
                    >
                        {cancelling ? "Đang hủy..." : "Xác nhận hủy"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default OrdersList;
