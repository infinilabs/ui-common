import { default as React } from 'react';
import { PhysicalCardData } from './types';

export interface PhysicalCardAction {
    label: string;
    onClick?: () => void;
}
export interface PhysicalCardProps {
    title: string;
    subtitle?: string;
    description?: string;
    imageUrl?: string;
    actions?: PhysicalCardAction[];
    footer?: string;
    triggerType?: "click" | "hover";
    popupMode?: "modal";
    trigger?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    modalTitle?: string;
    width?: number;
    placement?: "left" | "right" | "top" | "bottom";
    hoverOpenDelay?: number;
    closeDelay?: number;
    autoPlacement?: boolean;
    hoverAutoClose?: boolean;
    hoverAutoCloseDelay?: number;
    data?: PhysicalCardData;
}
declare const PhysicalCard: ({ title, subtitle, description, imageUrl, actions, footer, triggerType, popupMode, trigger, open, onOpenChange, modalTitle, width, placement, data, hoverOpenDelay, closeDelay, autoPlacement, hoverAutoClose, hoverAutoCloseDelay, }: PhysicalCardProps) => import("react/jsx-runtime").JSX.Element;
export default PhysicalCard;
