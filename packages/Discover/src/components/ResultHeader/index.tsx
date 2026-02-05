import { Button, Space } from "antd";
import { PanelLeftOpen, PanelTopClose, PanelTopOpen } from "lucide-react";
import Info from "./Info";

interface ICollapseState {
    sideBar: boolean,
    histogram: boolean,
}

interface IProps {
    collapseState: ICollapseState,
    setCollapseState: (collapseState: ICollapseState) => void;
    took: number;
    total: number;
    timeChartProps: any;
}

export default function ResultHeader(props: IProps) {
    const { collapseState, setCollapseState, took, total, timeChartProps } = props;
    return (
        <div className="flex items-center justify-between p-8px">
            <Space.Compact>
                {
                    collapseState.sideBar && (
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
            </Space.Compact>

            <Info 
                took={took}
                total={total}
                {...(timeChartProps || {})}
            />
        </div>
    )
}