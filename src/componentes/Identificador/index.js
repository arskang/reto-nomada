import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Spin, Layout, Upload, Typography, Row, Col, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
// Redux
import { useDispatch } from "react-redux";
import { setActorName } from '../../redux/actions';

import { identificarFamoso, validarTipo } from '../../metodos';

const { Dragger } = Upload;
const { Title } = Typography;
const { Content } = Layout;

function Identificador() {

    const dispatch = useDispatch();
    const setActorNameRedux = (actorName) => dispatch(setActorName(actorName));

    const [redirigir, setRedirigir] = useState(null);
    const [loader, setLoader] = useState(false);

    const props = {
        onChange({ file }) {
            (async () => {
                try {
                    setLoader(true);
                    const { originFileObj, status } = file;
                    if(status === "uploading" || status === "removed") return; 
                    const { type } = originFileObj;
                    await validarTipo(type);
                    let actorName = await identificarFamoso(originFileObj);
                    message.success(`${actorName} es el actor.`);
                    setActorNameRedux(actorName);
                    setRedirigir(<Redirect to="/famoso" />);
                } catch({message:mensaje}) {
                    setLoader(false);
                    message.error(mensaje);
                }
            })();
        },
        // accept: ".jpg, .jpeg, .png",
        // name: 'file',
        // method: "POST",
        // action: "https://whois.nomada.cloud/upload",
        // headers: { Nomada: "YjJjMzRhYjUtMjdjZS00NjZlLTg0OWYtMDU4ZjA5MjFlMjYy" },
        // onChange({ file }) {
        //     const { response, status } = file;
        //     if(status === "uploading" || status === "removed") return;
        //     if(status === "error")  message.error("Ocurrio un error");
        //     if(status === "done") {
        //         let { error, actorName } = response;
        //         if(error.trim() !== "") message.error(error);
        //         else {
        //             message.success(`${actorName} es el actor.`);
        //             setActorNameRedux(actorName);
        //             setRedirigir(<Redirect to="/famoso" />);
        //         }
        //     }
        // }
    };

    const componente = <Content className="site-layout-background" style={{ padding: 30, margin: 0, minHeight: 500 }} >
        <Row justify="center" align="middle">
            <Col xs={24} md={18} >
                <Title align="center">¿Quién es este actor?</Title>
                <Dragger {...props} style={{ padding: 30 }}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Haz click o arrastra una imagen</p>
                    <p className="ant-upload-hint">
                        Selecciona la foto de un actor famoso para conocer quién es y en qué películas ha salido.
                    </p>
                </Dragger>
            </Col>
        </Row>
    </Content>;

    return (redirigir ? redirigir : (loader ? <Spin>{componente}</Spin> : componente));
}

export default Identificador;