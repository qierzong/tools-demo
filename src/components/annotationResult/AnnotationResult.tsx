import React, { useEffect } from "react";
import cx from 'classnames';
import { Rect } from "../shapes/rect";

interface AnnotationResultProps {
    value?: Rect[],
    currentShape?: Rect;
    onselect?: (val: Rect) => void
}
const AnnotationResult = ({ value, onselect, currentShape }: AnnotationResultProps) => {
    return (
        <>
            {value && value.length > 0 ? value.map((item, index: number) => {
                return (
                    <div key={index} className={cx("tag", {selected: currentShape?.text === item.text})} onClick={() => { onselect?.(item, index) }}>
                        {item.text}
                    </div>
                )
            }): (
                <div className="empty">
                    尚未标注
                </div>
            )}
        </>)
}
export default AnnotationResult;