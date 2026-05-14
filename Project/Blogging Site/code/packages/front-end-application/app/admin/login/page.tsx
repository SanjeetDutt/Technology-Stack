import {Card} from "@component";
import style from "./page.module.scss"

export default function (props:PageProps<"/admin/login">) {

    return (
        <div className={style.loginPage}>
            <Card>
                Hello world
            </Card>
        </div>
    )
}