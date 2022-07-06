import { Form , Button } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { USERNAME_LABEL , PASSWORD_LABEL , LOGIN_TITLE , USERNAME_INVALID_MESSAGE , PASSWORD_INVALID_MESSAGE} from "./Constants"
import './Form.css';
import  store  from "../Store/store";
import { login } from "../Action/Actions";
import { authenticatePromise } from "../Service/userService";
export default function LoginForm({setDisplayedFormLogin , setAuthenticated}){
    const {register , handleSubmit , watch ,formState : {errors}} = useForm();

    const onSubmit = (formData) => {
        authenticatePromise(formData.username , formData.password)
        .then(currentUser => {
            store.dispatch(login(currentUser));
            console.log(store.getState());
            setDisplayedFormLogin(false);
            setAuthenticated(true);
        })
    }

    return (
        <div className="login-form">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="form-group" controlId="formUsername">
                    <Form.Label className="form-label">{USERNAME_LABEL}</Form.Label>
                    <Form.Control type="text" placeholder="Tên đăng nhập" className={`form-input ${errors.username ? 'form-input--invalid' : ''}`}
                    {...register("username" , {required : USERNAME_INVALID_MESSAGE , minLength : {value : 2 , message : USERNAME_INVALID_MESSAGE} , maxLength : {value : 30 , message : USERNAME_INVALID_MESSAGE}})}/>
                </Form.Group>
                <Form.Group className="form-group" controlId="formPassword">
                    <Form.Label className="form-label">{PASSWORD_LABEL}</Form.Label>
                    <Form.Control type="password" placeholder="Mật khẩu" className={`form-input ${errors.password ? 'form-input--invalid' : ''}`}
                    {...register("password" , {required : PASSWORD_INVALID_MESSAGE})}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">{LOGIN_TITLE}</Button>
            </Form>
        </div>        
    )
}