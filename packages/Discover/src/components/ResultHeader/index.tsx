import { Button, Form, InputNumber, Modal, Space } from "antd";
import { Download, PanelLeftOpen, PanelTopClose, PanelTopOpen } from "lucide-react";
import Info from "./Info";
import { useContext, useRef, useState } from "react";
import { GlobalConfigContext } from "..";

interface ICollapseState {
    sideBar: boolean,
    histogram: boolean,
}

interface IProps {
    showCollapse: ICollapseState,
    collapseState: ICollapseState,
    setCollapseState: (collapseState: ICollapseState) => void;
    took: number;
    total: number;
    timeChartProps: any;
    onDownloadQuery?: (from: number, size: number, handleDownload?: (hits: any[], columns: string[], timeField?: string) => void, shouldCancel?: () => boolean) => void;
    downloading?: boolean;
    exportMaxSize?: number;
    exportUsePit?: boolean;
    onRefreshExportLimit?: () => void;
}

export default function ResultHeader(props: IProps) {
    const { showCollapse, collapseState, setCollapseState, took, total, timeChartProps, onDownloadQuery, downloading = false, exportMaxSize = 10000, exportUsePit = false, onRefreshExportLimit } = props;

    const showSideBar = showCollapse.sideBar && collapseState.sideBar
    const showHistogram = showCollapse.histogram

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm()
    const { i18n } = useContext(GlobalConfigContext)
    const i18nDownload = i18n?.download || {}
    const isCancelRef = useRef(false)

    const handleDownload = async (hits: any[], columns: string[], timeField?: string) => {
        if (isCancelRef.current) return;
        let headers = [...columns];
        if (timeField) {
            headers = [timeField, ...headers.filter(col => col !== timeField)];
        }

        const csvRows = hits.map(record => {
            const source = record._source || {};
            return headers.map(fieldName => {
                let value = '';

                if (fieldName === '_source') {
                    value = source;
                } else if (fieldName in source) {
                    value = source[fieldName];
                } else {
                    value = fieldName.split('.').reduce((obj, key) => (obj ? obj[key] : undefined), source);
                }

                if (typeof value === 'object' && value !== null) {
                    value = JSON.stringify(value);
                }

                const cell = String(value ?? '').replace(/"/g, '""');
                return `"${cell}"`;
            }).join(',');
        });

        const csvContent = [headers.join(','), ...csvRows].join('\n');

        const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = window.document.createElement("a");
        const url = URL.createObjectURL(blob);

        link.setAttribute("href", url);
        link.setAttribute("download", `${new Date().getTime()}.csv`);
        link.style.visibility = 'hidden';
        window.document.body.appendChild(link);
        link.click();
        window.document.body.removeChild(link);
        setIsModalOpen(false);
        form.resetFields()
    }

    const showModal = () => {
        isCancelRef.current = false
        onRefreshExportLimit?.()
        setIsModalOpen(true);
    };

    const validateExportParams = () => {
        const { from, size } = form.getFieldsValue();
        const fromValue = Number(from) || 0;
        const sizeValue = Number(size) || 0;
        if (sizeValue > exportMaxSize) {
            return Promise.reject(new Error((i18nDownload.sizeExceedHint || 'Size max is %d').replace('%d', String(exportMaxSize))));
        }
        if (fromValue + sizeValue > exportMaxSize) {
            const hint = exportUsePit
                ? (i18nDownload.totalExceedHint || 'from + size max is %d (total records)').replace('%d', String(total))
                : (i18nDownload.rangeExceedHint || 'from + size max is %d').replace('%d', String(exportMaxSize));
            return Promise.reject(new Error(hint));
        }
        if (!exportUsePit && fromValue + sizeValue > total) {
            return Promise.reject(new Error((i18nDownload.totalExceedHint || 'from + size max is %d (total records)').replace('%d', String(total))));
        }
        return Promise.resolve();
    };

    const handleOk = async () => {
        const params = await form.validateFields();
        onDownloadQuery?.(params.from, params.size, handleDownload, () => isCancelRef.current);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields()
        isCancelRef.current = true
    };

    return (
        <div className="flex items-center justify-between p-8px">
            <Space.Compact>
                {
                    showSideBar && (
                        <Button
                            className="flex-shrink-0"
                            icon={<PanelLeftOpen className="w-14px h-14px" />}
                            onClick={() => {
                                setCollapseState({
                                    ...collapseState,
                                    sideBar: false
                                })
                            }}
                        />
                    )
                }
                {
                    showHistogram && (
                        <Button
                            className="flex-shrink-0"
                            icon={collapseState.histogram ? <PanelTopOpen className="w-14px h-14px" /> : <PanelTopClose className="w-14px h-14px" />}
                            onClick={() => {
                                setCollapseState({
                                    ...collapseState,
                                    histogram: !collapseState.histogram
                                })
                            }}
                        />
                    )
                }
                <Button
                    className="flex-shrink-0"
                    icon={<Download className="w-14px h-14px" />}
                    onClick={() => {
                        showModal()
                    }}
                />
            </Space.Compact>

            <Info
                took={took}
                total={total}
                {...(timeChartProps || {})}
            />

            <Modal
                title={(i18nDownload.title || `Export search as CSV (up to %d records)`).replace('%d', String(exportMaxSize))}
                closable
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                destroyOnHidden
                okButtonProps={{
                    loading: downloading
                }}
            >
                <Form form={form} layout="vertical" className="mt-24px" initialValues={{ from: 0, size: 20 }}>
                    <Form.Item
                        label={`From`}
                        name="from"
                        required
                        tooltip={(i18nDownload.fromRangeHint || `From range: 0 ~ %d`).replace('%d', String(Math.min(total - 1, exportMaxSize - 1)))}
                        rules={[{ validator: validateExportParams }]}
                    >
                        <InputNumber className="w-full" min={0} max={Math.min(total - 1, exportMaxSize - 1)} />
                    </Form.Item>
                    <Form.Item
                        label={`Size`}
                        name="size"
                        required
                        rules={[{ validator: validateExportParams }]}
                    >
                        <InputNumber className="w-full" min={1} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}