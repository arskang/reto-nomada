import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Tag, Layout, Typography, Row, Col, Image, Button, Space, Divider, Badge } from 'antd';
import { StarFilled } from '@ant-design/icons';

import { useSelector } from "react-redux";

import { obtenerInfoFamoso, urlImages, obtenerGenero, formatearFecha } from '../../metodos';

import errorImage from '../../assets/undraw_blank_canvas_3rbb.svg';

const { Title, Text } = Typography;
const { Content } = Layout;

function Listado() {
    
    const { actorName } = useSelector(state => state);

    const [famoso, setFamoso] = useState(null);
    const [redirigir, setRedirigir] = useState(null);
    const [error, setError] = useState(null);
 
    function regresar() {
        setRedirigir(<Redirect to="/" />)
    }

    function effect() {
        async function effect() {
            try {

                if(!actorName) throw new Error("Lamentablemente no hemos obtenido el nombre de un famoso");

                setError(null);
                let resultado = await obtenerInfoFamoso(actorName);
                if(!resultado || typeof resultado !== "object" || Object.keys(resultado).length === 0) throw new Error("Lamentablemente no se puedo obtener la información del famoso");
                let { results } = resultado;
                setFamoso(results);

            } catch({message}) { setError(message); }
        } effect();
    }

    useEffect(effect, [actorName]);

    return(
        redirigir ? redirigir : <Layout>
            <Content className="site-layout-background" style={{ padding: 30, margin: 0, minHeight: 500 }} >
                <Row justify="center" align="middle">
                    <Col span={24}>
                        {
                            error ? <Layout>
                                <Content>
                                    <Row justify="center" align="middle">
                                        <Col xs={24}>
                                            <Title align="center" level={4} type="danger">{error}</Title>
                                        </Col>
                                        <Col align="center" xs={24}>
                                            <Image
                                                width={200}
                                                preview={false}
                                                src={errorImage}
                                            />
                                        </Col>
                                        <Col xs={5}>
                                            <Button type="primary" block danger onClick={regresar}>
                                                Regresar
                                            </Button>
                                        </Col>
                                    </Row>
                                </Content>
                            </Layout> : <Layout>
                                <Content>
                                    <Row justify="center" align="middle">
                                        <Col>
                                            <Title align="center">{actorName}</Title>
                                            <Button type="primary" primary block onClick={regresar}>
                                                Regresar
                                            </Button>
                                        </Col>
                                    </Row>
                                </Content>
                                <Divider />
                                <Content>
                                    {
                                        famoso && famoso.map(({ profile_path, gender, popularity, known_for, name }, key) => (<Row justify="center" align="middle" key={key}>
                                            <Col xs={24} md={6}>
                                                <Row justify="center" align="middle">
                                                    <Col xs={24} align="center">
                                                        <Image
                                                            width={200}
                                                            src={`${urlImages}${profile_path}`}
                                                        />   
                                                    </Col>
                                                    <Col xs={24} align="center">
                                                        <Space direction="vertical">
                                                            <Title level={3}>{name}</Title>
                                                            <Tag color="processing">{obtenerGenero(gender)}</Tag>
                                                            <Text align="center">Popularidad: <b>{popularity}</b></Text>
                                                        </Space> 
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs={24} md={18}>
                                                <Row justify="center" align="middle">
                                                    {
                                                        known_for && known_for.map(({ title, vote_average, poster_path, overview, release_date }, key) => (<Col xs={24} key={key}>
                                                            <Row justify="center" align="middle">
                                                                <Col xs={24} sm={12} md={9} lg={9} align="center">
                                                                    <Image
                                                                        width={200}
                                                                        align="center"
                                                                        src={`${urlImages}${poster_path}`}
                                                                    />
                                                                </Col>
                                                                <Col xs={24} sm={12} md={15} lg={15}>
                                                                    <Space direction="vertical">
                                                                        <Title level={3}>{title} <Badge>
                                                                            {vote_average}/10 <StarFilled style={{ color: "#f78c25" }} />
                                                                        </Badge></Title>
                                                                        <Text>{overview}</Text>
                                                                        {
                                                                            release_date && <Text>Fecha de estreno: <b>{formatearFecha(release_date)}</b></Text>
                                                                        }
                                                                        <Divider />
                                                                    </Space>
                                                                </Col>
                                                            </Row>
                                                        </Col>))
                                                    }
                                                </Row>
                                            </Col>
                                            <Col xs={24}><Divider /></Col>
                                        </Row>))
                                    }
                                </Content>
                            </Layout>
                        }
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}

export default Listado;