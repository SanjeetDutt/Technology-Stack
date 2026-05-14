import style from "./layout.module.scss"

export default function (props:LayoutProps<"/admin">){

    return(
        <div className={style.layout}>
            <div className={style.content}>{props.children}</div>
        </div>
    )
}