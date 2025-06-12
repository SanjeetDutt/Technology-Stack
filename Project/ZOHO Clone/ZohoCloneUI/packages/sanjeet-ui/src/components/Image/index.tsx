import {type Styling} from "../../styling";
import {useTheme} from "../../store";
import styled from "styled-components";

type  ImageProps = {
	src: string
} & Styling.Property<any>

export const Image = (props: ImageProps)=>{
	const {getStyle} = useTheme()
	const style = getStyle(props)

	const ImageComponent = styled.img`${style}`

	return <ImageComponent src={props.src}/>
}