import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root {
  --gray-100:#C1C1C1;
  --gray-300: #9D9D9D;
  --gray-700: #707070;   
  --background:#F7F7F7;
  --green: #B5C401;
  --white:#FFFFFF;
  --shape:#EBEBEB;
    
}


*{
  margin:0;
  padding:0;
  box-sizing: border-box;
  font-family:  "Helvetica Neue", Arial, sans-serif;
}

html,body,#root{
  height: 100%;
}

body {
  background: var(--background);
}

html{
  @media(max-width: 1080px){
    font-size:93.75% //15px
  }
  @media(max-width: 720px){
    font-size:87.5% //14px
  }
}

*, button, input {
  border:0;
  outline:0;
}

button,input{
  cursor: pointer;
}

`;
