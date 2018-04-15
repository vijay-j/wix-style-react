import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from 'wix-style-react/Modal';
import {Button} from 'wix-style-react/Backoffice';
import MessageBoxFunctionalLayout from 'wix-style-react/MessageBox/MessageBoxFunctionalLayout';
import {Container, Row, Col} from 'wix-style-react/Grid';
import DatePicker from 'wix-style-react/DatePicker';

class ControlledModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool
  };

  constructor({isOpen = false}) {
    super();
    this.state = {
      isOpenBlueModal: isOpen,
      isOpenModalWithDatePicker: false
    };
  }

  render() {
    const setState = state => () => this.setState(state);

    const closeBlueModal = setState({isOpenBlueModal: false});
    const openBlueModal = setState({isOpenBlueModal: true});

    const closeModalWithDatePicker = setState({isOpenModalWithDatePicker: false});
    const openModalWithDatePicker = setState({isOpenModalWithDatePicker: true});

    return (
      <Container>
        <Row>
          <Col span={2}>
            <Button onClick={openBlueModal} >Open Blue Modal</Button>
            <Modal
              isOpen={this.state.isOpenBlueModal}
              onRequestClose={closeBlueModal}
              contentLabel="Modal Example"
              scrollableContent={false}
              >
              <MessageBoxFunctionalLayout
                theme="blue"
                title="title"
                confirmText="OK"
                cancelText="Cancel"
                onOk={closeBlueModal}
                onCancel={closeBlueModal}
                >
                Hello blue world!
              </MessageBoxFunctionalLayout>
            </Modal>
          </Col>
          <Col span={3}>
            <Button onClick={openModalWithDatePicker} >Open with DatePicker</Button>
            <Modal
              isOpen={this.state.isOpenModalWithDatePicker}
              onRequestClose={closeModalWithDatePicker}
              contentLabel="Modal Example"
              scrollableContent={false}
              >
              <MessageBoxFunctionalLayout
                theme="blue"
                title="title"
                confirmText="OK"
                cancelText="Cancel"
                onOk={closeModalWithDatePicker}
                onCancel={closeModalWithDatePicker}
                >
                <DatePicker/>
              </MessageBoxFunctionalLayout>
            </Modal>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default () =>
  <div>
    <ControlledModal/>
  </div>;
