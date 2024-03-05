import React from "react";
import cx from 'classnames';
import { Rect } from "../shapes/rect";
import { GroupItem } from "../../tool-video/store";
import AnnotationResult from "../annotationResult/AnnotationResult";


interface AnnotationResultProps {
    value?: GroupItem | undefined,
    onSelect?: (val: Rect, index: number) => void;
    onSelectGroup?: (val: string) => void;
    currentGroupKey: string | undefined;
}
const AnnotationVideoResult = ({ value, onSelect, onSelectGroup, currentGroupKey }: AnnotationResultProps) => {
    return (
        <>
            {value && Object.values(value).length > 0 ? Object.values(value).map((item: {shape: Rect[]}, index: number) => {
                const key = Object.keys(value)[index]
                return (
                    <div key={key}>
                        <div className={cx("tag group-name", { selected: currentGroupKey === key })} onClick={() => onSelectGroup?.(key)}>{key}</div>
                        {currentGroupKey === key && (
                            <div style={{ padding: '10px' }}>
                                <AnnotationResult value={item.shape} onSelect={onSelect} />
                            </div>
                        )}
                    </div>
                )
            }) : (
                <div className="empty">
                    {/* 尚未标注 */}
                </div>
            )}
        </>)
}
export default AnnotationVideoResult;