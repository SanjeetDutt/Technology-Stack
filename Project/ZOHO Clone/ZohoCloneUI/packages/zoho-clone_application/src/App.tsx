import {Container} from "sanjeet-ui"
import type {StyledComponent} from "./configurations";

const ContainerStyling:StyledComponent = {
    padding: "2rem",
    height: "100px",
    backgroundColor:"SECONDARY",
    sm:{
    }
}

export const App = () => {

  return (
      <Container {...ContainerStyling}>
          This is container
      </Container>
  )
}