import {type Styling} from "../../styling";
import {useTheme} from "../../store";
import styled from "styled-components";

type ButtonProps = {
    children?: React.ReactNode;
    onClick?:()=>void
} & Styling.Property

export const Button = (props:ButtonProps)=>{
    const {getStyle} = useTheme()
    const style = getStyle(props)

    const ButtonComponent = styled.button`${style}`

    return <ButtonComponent
        onClick={props.onClick}
        children={props.children}
    />
}