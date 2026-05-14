import style from "./layout.module.scss"

export default function (props:LayoutProps<"/admin">){

    return(
        <div className={style.layout}>
            <div className={`${style.shape} ${style.shapeShape1}`}></div>
            <div className={`${style.shape} ${style.shapeShape2}`}></div>
            <div className={`${style.shape} ${style.shapeShape3}`}></div>
            <div className={`${style.shape} ${style.shapeShape4}`}></div>
            <div className={style.content}>{props.children}</div>
        </div>
    )
}