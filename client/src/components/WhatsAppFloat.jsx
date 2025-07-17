import React from 'react'
import styled from 'styled-components'

const WhatsAppFloat = () => {
  return (
    <StyledDiv>
        <a href="https://wa.me/+923191242433?text=Hello%20I'm%20interested">
        <i class="bi bi-whatsapp"></i>
        </a>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
    a{
        position: fixed;
  bottom: 30px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #25d366;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 30px;
    }
`;

export default WhatsAppFloat;