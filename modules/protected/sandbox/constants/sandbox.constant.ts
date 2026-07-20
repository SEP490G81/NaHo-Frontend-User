export const getSandboxRules = (t: (key: string) => string) => {
    // Trả về danh mục các quy tắc từ i18n
    return [t("rules.rule1"), t("rules.rule2"), t("rules.rule3")];
};
