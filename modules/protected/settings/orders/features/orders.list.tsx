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

const OrdersList: React.FC = () => {
    const t = useTranslations("settings.orders");

    const [orders, setOrders] = useState<PaymentOrderResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Status filter state
    const [statusFilter, setStatusFilter] = useState<string>("ALL");

    // Cancel modal state
    const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
    const [orderToCancel, setOrderToCancel] = useState<string | null>(null);
    const [cancelling, setCancelling] = useState<boolean>(false);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const data = await getMyPaymentOrders();
            // Sort by creation time descending (newest first)
            const sorted = [...data].sort(
                (a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime(),
            );
            setOrders(sorted);
        } catch (err: any) {
            console.error("Failed to load payment orders:", err);
            toast.error(err.message || "Không thể lấy danh sách lịch sử giao dịch.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleContinuePayment = (order: PaymentOrderResponse) => {
        let paymentUrl = order.paymentUrl;

        // Try reading saved paymentUrl from localStorage
        if (!paymentUrl) {
            try {
                const savedUrls = JSON.parse(localStorage.getItem("naho_payment_urls") || "{}");
                paymentUrl = savedUrls[order.orderCode];
            } catch (e) {
                console.error("Failed to read paymentUrl from localStorage:", e);
            }
        }

        if (paymentUrl) {
            window.open(paymentUrl, "_blank");
        } else {
            toast.warning("Không tìm thấy đường dẫn thanh toán cũ. Vui lòng thử tạo giao dịch mới.");
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
                        className="font-bold animate-pulse"
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

    const filterTabs = [
        { key: "ALL", label: "Tất cả", count: orders.length },
        { key: "PAID", label: t("statusPaid"), count: orders.filter((o) => o.status === "PAID").length },
        { key: "PENDING", label: t("statusPending"), count: orders.filter((o) => o.status === "PENDING").length },
        { key: "CANCELLED", label: t("statusCancelled"), count: orders.filter((o) => o.status === "CANCELLED").length },
        { key: "EXPIRED", label: t("statusExpired"), count: orders.filter((o) => o.status === "EXPIRED").length },
    ];

    const filteredOrders = statusFilter === "ALL"
        ? orders
        : orders.filter((o) => o.status === statusFilter);

    if (loading) {
        return (
            <div className="space-y-4">
                <Skeleton variant="rectangular" height={50} className="rounded-xl" />
                <Skeleton variant="rectangular" height={50} className="rounded-xl" />
                <Skeleton variant="rectangular" height={50} className="rounded-xl" />
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-bdc-primary bg-bgc-card p-12 text-center">
                <ReceiptLongOutlinedIcon className="text-text-muted text-6xl mb-3 opacity-40" />
                <p className="text-base font-semibold text-text-primary">
                    {t("noOrders")}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Centered Status Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2">
                {filterTabs.map((tab) => {
                    const isSelected = statusFilter === tab.key;
                    return (
                        <button
                            key={tab.key}
                            onClick={() => setStatusFilter(tab.key)}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                                isSelected
                                    ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 font-bold shadow-sm scale-105"
                                    : "bg-hbgc-app hover:bg-primary/10 text-text-contrast hover:text-primary border border-bdc-primary"
                            }`}
                        >
                            {tab.label} ({tab.count})
                        </button>
                    );
                })}
            </div>

            {filteredOrders.length === 0 ? (
                <div className="rounded-xl border border-bdc-primary/40 bg-bgc-card p-8 text-center text-text-muted text-sm font-medium">
                    Không có đơn hàng nào thuộc trạng thái này.
                </div>
            ) : (
                <TableContainer component={Paper} elevation={0} className="rounded-xl border border-bdc-primary overflow-hidden">
                    <Table sx={{ minWidth: 650 }} aria-label="payment orders table">
                        <TableHead className="bg-bgc-subtle">
                            <TableRow>
                                <TableCell align="center" className="font-bold text-text-primary">{t("orderCode")}</TableCell>
                                <TableCell align="center" className="font-bold text-text-primary">{t("amount")}</TableCell>
                                <TableCell align="center" className="font-bold text-text-primary">{t("provider")}</TableCell>
                                <TableCell align="center" className="font-bold text-text-primary">{t("status")}</TableCell>
                                <TableCell align="center" className="font-bold text-text-primary">{t("createdTime")}</TableCell>
                                <TableCell align="center" className="font-bold text-text-primary">{t("actions")}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredOrders.map((order) => (
                                <TableRow
                                    key={order.id || order.orderCode}
                                    className="hover:bg-bgc-subtle/50 transition-colors"
                                >
                                    <TableCell align="center" className="font-mono font-medium text-text-primary">
                                        {order.orderCode}
                                    </TableCell>
                                    <TableCell align="center" className="font-bold text-primary">
                                        {new Intl.NumberFormat("vi-VN").format(order.amount)} {order.currency}
                                    </TableCell>
                                    <TableCell align="center" className="text-text-contrast font-medium text-xs sm:text-sm">
                                        {order.provider}
                                    </TableCell>
                                    <TableCell align="center">
                                        {getStatusChip(order.status)}
                                    </TableCell>
                                    <TableCell align="center" className="text-xs text-text-contrast/80 font-medium">
                                        {new Date(order.createdTime).toLocaleString("vi-VN", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </TableCell>
                                    <TableCell align="center">
                                        {order.status === "PENDING" ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    color="primary"
                                                    startIcon={<PaymentOutlinedIcon fontSize="small" />}
                                                    onClick={() => handleContinuePayment(order)}
                                                    className="normal-case font-bold text-xs shadow-sm"
                                                >
                                                    {t("continuePayment")}
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    color="error"
                                                    startIcon={<CancelOutlinedIcon fontSize="small" />}
                                                    onClick={() => handleOpenCancelDialog(order.orderCode)}
                                                    className="normal-case font-semibold text-xs"
                                                >
                                                    {t("cancelOrder")}
                                                </Button>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-text-muted font-medium">-</span>
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
                <DialogTitle className="font-bold text-lg text-text-primary">
                    {t("confirmCancelTitle")}
                </DialogTitle>
                <DialogContent>
                    <p className="text-sm text-text-muted">
                        {t("confirmCancelMessage", { orderCode: orderToCancel || "" })}
                    </p>
                </DialogContent>
                <DialogActions className="p-4 pt-2">
                    <Button
                        onClick={() => setCancelDialogOpen(false)}
                        disabled={cancelling}
                        color="inherit"
                        className="normal-case font-medium"
                    >
                        Hủy bỏ
                    </Button>
                    <Button
                        onClick={handleConfirmCancel}
                        disabled={cancelling}
                        color="error"
                        variant="contained"
                        startIcon={cancelling ? <CircularProgress size={16} color="inherit" /> : null}
                        className="normal-case font-bold shadow"
                    >
                        {cancelling ? "Đang hủy..." : "Xác nhận hủy"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default OrdersList;
