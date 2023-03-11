import Header from "../components/layout/Header";
import {Outlet} from "react-router-dom";
import Footer from "../components/layout/Footer";
import styled from "styled-components";

const Layout = styled.div`
    display: grid;
    grid-template-rows: 1fr 10fr 1fr;
    height: 100vh;
`;

const Main = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function Root() {
    return (
        <Layout>
            <Header />
            <Main>
                <Outlet />
            </Main>
            <Footer />
        </Layout>
    );
}