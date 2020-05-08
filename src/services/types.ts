import { ViewContainerRef } from "@angular/core";

export type DialogOptions = {
    title?: string;
    icon?: string;
    vcRef?: ViewContainerRef;
    minHeight?: number;
    minWidth?: number;
    maxHeight?: number;
    maxWidth?: number;
    actionsAlign?: string;
};

export type DialogContext<T, K = any> = {
    data?: T;
    config?: K;
    options: DialogOptions;
};

export type ConfirmOptions = {
    message?: string;
    cancelText?: string;
    okText?: string;
    vcRef?: ViewContainerRef;
};
