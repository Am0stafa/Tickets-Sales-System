import React from 'react'
import { CCard, CCardBody, CCardFooter, CCardImage, CCardTitle, CCardText, CCol, CRow,CButton } from '@coreui/react'


const Card = () => {
  return (
    <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 3 }}>
        <CCol xs>
            <CCard>
            <CCardImage orientation="top" src="https://cdn.thestatszone.com/uploads/thumbnails/_r169l/2022_African_Cup_of_Nations_Egypt_Vs_Morocco.jpg" />
            <CCardBody>
                <CCardTitle>Card title</CCardTitle>
                <CCardText>
                This is a wider card with supporting text below as a natural lead-in to additional
                content. This content is a little bit longer.
                </CCardText>
            </CCardBody>
            <CCardFooter>
                <CButton href="#">Go somewhere</CButton>
            </CCardFooter>
            </CCard>
        </CCol>
        <CCol xs>
            <CCard>
            <CCardImage orientation="top" src="https://cdn.thestatszone.com/uploads/thumbnails/_r169l/2022_African_Cup_of_Nations_Egypt_Vs_Morocco.jpg" />
            <CCardBody>
                <CCardTitle>Card title</CCardTitle>
                <CCardText>
                This is a wider card with supporting text below as a natural lead-in to additional
                content. This content is a little bit longer.
                </CCardText>
            </CCardBody>
            <CCardFooter>
                <CButton href="#">Go somewhere</CButton>
            </CCardFooter>
            </CCard>
        </CCol>
        <CCol xs>
            <CCard>
            <CCardImage orientation="top" src="https://cdn.thestatszone.com/uploads/thumbnails/_r169l/2022_African_Cup_of_Nations_Egypt_Vs_Morocco.jpg" />
            <CCardBody>
                <CCardTitle>Card title</CCardTitle>
                <CCardText>
                This is a wider card with supporting text below as a natural lead-in to additional
                content. This content is a little bit longer.
                </CCardText>
            </CCardBody>
            <CCardFooter>
                <CButton href="#">Go somewhere</CButton>
            </CCardFooter>
            </CCard>
        </CCol>
        <CCol xs>
            <CCard>
            <CCardImage orientation="top" src="https://cdn.thestatszone.com/uploads/thumbnails/_r169l/2022_African_Cup_of_Nations_Egypt_Vs_Morocco.jpg" />
            <CCardBody>
                <CCardTitle>Card title</CCardTitle>
                <CCardText>
                This is a wider card with supporting text below as a natural lead-in to additional
                content. This content is a little bit longer.
                </CCardText>
            </CCardBody>
            <CCardFooter>
                <CButton href="#">Go somewhere</CButton>
            </CCardFooter>
            </CCard>
        </CCol>
    </CRow>
  )
}

export default Card