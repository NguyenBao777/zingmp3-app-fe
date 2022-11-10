import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import isEmpty from 'validator/lib/isEmpty';
import { Alert } from "../../components";
import { userLogin } from '../../helpers/helperAPI';
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

const LoginForm = ({ setAlert, setShowLoginForm, setShowRegistationForm }) => {
    const [msgValidation, setMsgValidation] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);

    const [typePassword, setTypePassword] = useState("password");
    const [{ user }, dispatch] = useStateValue();

    const validation = () => {
        const msg = {};

        if (isEmpty(username)) {
            msg.username = "Vui lòng nhập username";
        }

        if (isEmpty(password)) {
            msg.password = "Vui lòng nhập password";
        }

        setMsgValidation(msg);
        setTimeout(() => setMsgValidation(""), 1500);
        if (Object.keys(msg).length > 0) return true;

        return false;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validation()) return;
        // handleSubmit
        const formData = {
            username: username,
            password: password
        }
        userLogin(formData).then((res) => {
            if (res.data.success) {
                dispatch({
                    type: actionType.SET_USER,
                    user: res.data.message
                });
                if (remember) localStorage.setItem("user", JSON.stringify(res.data.message));
                setShowLoginForm(false);
            } else {
                setAlert({
                    type: "error",
                    message: "Sai Tài khoản hoặc Mật khẩu."
                });
                setTimeout(() => setAlert(""), 2000);
            }

        })
    }

    return (
        <form className="w-300 flex flex-col items-center gap-4 rounded-md shadow-md px-2 py-4 bg-headerColor"
            onSubmit={(e) => handleSubmit(e)}
        >
            <h4 className="text-white font-semibold text-lg">Đăng nhập</h4>
            <div className="w-full">
                <label htmlFor="username" className="text-white">Tài khoản:</label>
                <input type="text" id="username" value={username} placeholder="username" className="w-full px-2 py-1 border-none outline-none text-black rounded-md cursor-pointer bg-gray-300 focus-within:bg-white transition-all duration-150 ease-in-out"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <p className="text-red-700 font-light ml-2 text-xs italic">
                    <span className={`${msgValidation?.username ? "visible" : "invisible"}`}>* </span>
                    {msgValidation?.username}
                </p>
            </div>
            <div className="w-full relative">
                {typePassword === "password" ? (
                    <BsEyeFill className="text-headerColor text-xl cursor-pointer absolute top-8 right-2" onClick={() => setTypePassword("text")} />
                ) : (
                    <BsEyeSlashFill className="text-headerColor text-xl cursor-pointer absolute top-8 right-2" onClick={() => setTypePassword("password")} />
                )}
                <label htmlFor="password" className="text-white">Mật khẩu</label>
                <input type={typePassword} id="password" value={password} placeholder="password" autoComplete="true" className="w-full px-2 py-1 border-none outline-none text-black rounded-md cursor-pointer bg-gray-300 focus-within:bg-white transition-all duration-150 ease-in-out"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-red-700 font-light ml-2 text-xs italic">
                    <span className={`${msgValidation?.password ? "visible" : "invisible"}`}>* </span>
                    {msgValidation?.password}
                </p>
            </div>
            <div className="w-full flex items-center justify-start gap-2">
                <input type="checkbox" checked={remember} id="remember" className="w-4 h-4 bg-gray-300 rounded-md cursor-pointer"
                    onChange={() => setRemember(!remember)}
                />
                <label htmlFor="remember" className="text-white">Ghi nhớ</label>
            </div>
            <p className="text-white text-sm">Chưa có tài khoản?
                <span className="cursor-pointer text-blue-600" onClick={() => setShowRegistationForm(true)}> Đăng kí ngay.</span>
            </p>
            <button type="submit" className="flex items-center justify-center rounded-sm px-4 py-1 text-white bg-blue-600 hover:bg-blue-800 transition-all duration-150 ease-in-out">
                Đăng nhập
            </button>
        </form>

    )
}

export default LoginForm