import React from "react";
import Annotation from "../annotation/Annotation";
import './AnnotationVideo.scss';
import { Button } from "antd";
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons'
import { RectAttr } from "../shapes/rect";
import { GroupItem } from "../../tool-video/store";

const getFormatVideoTime = (time: number) => {
    let curtime = time
    let h = parseInt((curtime / 3600).toString())
    let m = parseInt(((curtime % 3600) / 60).toString())
    let s = parseInt((curtime % 60).toString())
    const hStr = h < 10 ? '0' + h : '' + h
    const mhStr = m < 10 ? '0' + m : '' + m
    const shStr = s < 10 ? '0' + s : '' + s
    return hStr + ':' + mhStr + ':' + shStr
}

interface AnnotationVideoProps {
    onChange: (val: { time: string, shape: RectAttr[] }) => void;
    onTimeUpdate: (val: string) => void
    value: GroupItem | undefined
    currentTime?: string
}

export class AnnotationVideo extends React.Component<AnnotationVideoProps> {
    videoRef: React.RefObject<HTMLVideoElement> = React.createRef();
    videoRefSrc = 'https://s3fuse-qa.s3.cn-northwest-1.amazonaws.com.cn/uploads/video/cn-appen-careers.mp4'
    ctx: CanvasRenderingContext2D | null = null;
    ratio = window.devicePixelRatio
    containerSize = {
        width: 0,
        height: 0,
        left: 0,
        top: 0
    };

    state: {
        isPause: boolean;
        loaded: boolean;
        currentTime: string;
        duration: string;
    } = {
            isPause: true,
            loaded: false,
            currentTime: '00:00:00',
            duration: '00:00:00',
        }

    onChange: (val: { time: string, shape: RectAttr[] }) => void;
    onTimeUpdate: (val: string) => void

    constructor(props: AnnotationVideoProps) {
        super(props);
        this.onChange = props.onChange
        this.onTimeUpdate = props.onTimeUpdate
    }
    async componentDidMount() {


    }

    componentDidUpdate(prevProps: Readonly<AnnotationVideoProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if (this.state.isPause && this.props.currentTime !== prevProps.currentTime) {
            this.setState({ currentTime: this.props.currentTime })
        }
    }
    updateShapes = (shapes: RectAttr[]) => {
        this.onChange({ time: this.state.currentTime, shape: shapes })
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                <div className="video-wrapper">
                    <video
                        ref={this.videoRef}

                        // controls
                        src={this.videoRefSrc}
                        controlsList="nodownload noremoteplayback"
                        crossOrigin="anonymous"
                        onPause={() => { this.setState({ isPause: true }) }}
                        onPlay={() => { this.setState({ isPause: false }) }}
                        onLoadedData={() => {
                            this.setState({ duration: getFormatVideoTime(this.videoRef.current?.duration || 0) })
                            this.setState({ loaded: true })
                        }}
                        onTimeUpdate={(e) => {
                            const currentTime = this.videoRef.current?.currentTime || 0
                            const formatedCurrentTime = getFormatVideoTime(currentTime)
                            this.setState({ currentTime: formatedCurrentTime })
                            this.onTimeUpdate(formatedCurrentTime)
                        }}
                    />
                    {this.state.loaded && (this.props.value?.[this.state.currentTime]?.shape || this.state.isPause) && (
                        <Annotation
                            value={this.props.value?.[this.state.currentTime]?.shape}
                            containerName='video-wrapper'
                            onChange={(shapes) => { this.updateShapes(shapes) }}
                        />)}
                </div>
                <div className="info-wrapper">

                    <div className="buttons">
                        {this.state.isPause ? (
                            <Button shape="circle" onClick={() => { this.videoRef.current?.play() }} icon={<PlayCircleOutlined style={{fontSize: '32px'}}/>}></Button>
                        ) : (
                            <Button shape="circle" onClick={() => { this.videoRef.current?.pause() }} icon={<PauseCircleOutlined style={{fontSize: '32px'}}/>}></Button>
                        )}
                    </div>
                    <div className="times">
                        {this.state.currentTime}/{this.state.duration}
                    </div>
                </div>
            </div>
        )
    }
}
export default AnnotationVideo;