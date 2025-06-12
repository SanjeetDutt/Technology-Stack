import {type Styling} from "../../styling";
import * as React from "react";
import {useTheme} from "../../store";
import styled from "styled-components";

type ContainerProps = {
    children?: React.ReactNode;
} & Styling.Property<any>

export function Container (props:ContainerProps) {
    const {getStyle} = useTheme()
    const style = getStyle(props)

    // TODO: NEED TO FIND A WAY TO GENERATE COMPONENT STATICALLY
    const StyledContainer = styled.div`
        display: flex;
        ${style}
    `
    return <StyledContainer children={props.children} />
}
