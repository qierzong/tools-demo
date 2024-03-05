import React from "react";
import { Rect } from "../shapes/rect";

interface AnnotationResultProps {
    value?: Rect[],
    onSelect?: (val: Rect, index: number) => void
}
const AnnotationResult = ({ value, onSelect }: AnnotationResultProps) => {
    return (
        <>
            {value && value.length > 0 ? value.map((item, index: number) => {
                return (
                    <div key={index} className="tag" style={{backgroundColor: item.strokeStyle}} onClick={() => { onSelect?.(item, index) }}>
                        {item.text}
                    </div>
                )
            }) : (
                <div className="empty">
                    {/* 尚未标注 */}
                </div>
            )}
        </>)
}
export default AnnotationResult;