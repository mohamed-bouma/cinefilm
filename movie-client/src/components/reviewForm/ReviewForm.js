import {Form, Button} from 'react-bootstrap';

const ReviewForm = ({clearInput, handleSubmit,revText,labelText,defaultValue}) => {
  return (
    <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>{labelText}</Form.Label>
            <Form.Control ref={revText} as="textarea" rows={3} defaultValue={defaultValue} />
        </Form.Group>
        <Button variant="outline-info" className="mx-2" onClick={handleSubmit}>Ajouter</Button>
        <Button variant="outline-danger" onClick={clearInput}>Effacer</Button>
    </Form>   
  )
}

export default ReviewForm
