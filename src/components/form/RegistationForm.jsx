import { useState } from 'react'
import isEmpty from 'validator/lib/isEmpty';
import { userRegistation } from '../../helpers/helperAPI';

const RegistationForm = ({ setAlert, setShowLoginForm, setShowRegistationForm }) => {
    const [msgValidation, setMsgValidation] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [asArtist, setAsArtist] = useState(false);
    const [name, setName] = useState("");
    const validation = () => {
        const msg = {};

        const checkConfirmpassword = (password, confirmpassword) => {
            if (password === confirmpassword) return false;

            return true;
        }

        if (checkConfirmpassword(password, confirmPassword)) {
            msg.password = "password không khớp.";
        }

        if (isEmpty(name)) {
            msg.name = "Vui lòng nhập họ và tên.";
        }

        if (isEmpty(username)) {
            msg.username = "Vui lòng nhập username.";
        }

        if (isEmpty(password)) {
            msg.password = "Vui lòng nhập password.";
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
            user_name: name,
            user_username: username,
            user_password: password,
            user_role: asArtist ? "artist" : "user"
        }
        userRegistation(formData).then((res) => {
            if (res.data.success) {
                setAlert({
                    type: "success",
                    message: "Đăng ký tài khoản thành công."
                });
                setTimeout(() => setAlert(""), 2000);
                setName("");
                setUsername("");
                setPassword("");
                setConfirmPassword("");
            } else {
                setAlert({
                    type: "error",
                    message: "Đăng ký tài khoản không thành công."
                });
                setTimeout(() => setAlert(""), 2000);
            }
        })
    }

    return (
        <form className="w-300 flex flex-col items-center gap-4 rounded-md shadow-md px-2 py-4  bg-gradient-to-b from-primary to-headerColor"
            onSubmit={(e) => handleSubmit(e)}
        >
            <h4 className="text-white font-semibold text-lg">Đăng ký tài khoản</h4>
            <div className="w-full">
                <label htmlFor="name" className="text-white">Họ và Tên:</label>
                <input type="text" id="name" value={name} placeholder="name" className="w-full px-2 py-1 border-none outline-none text-black rounded-md cursor-pointer bg-gray-300 focus-within:bg-white transition-all duration-150 ease-in-out"
                    onChange={(e) => setName(e.target.value)}
                />
                <p className="text-red-700 font-light ml-2 text-xs italic">
                    <span className={`${msgValidation?.name ? "visible" : "invisible"}`}>* </span>
                    {msgValidation?.name}
                </p>
            </div>
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
            <div className="w-full">
                <label htmlFor="password" className="text-white">Mật khẩu</label>
                <input type="password" id="password" value={password} placeholder="password" autoComplete="true" className="w-full px-2 py-1 border-none outline-none text-black rounded-md cursor-pointer bg-gray-300 focus-within:bg-white transition-all duration-150 ease-in-out"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-red-700 font-light ml-2 text-xs italic">
                    <span className={`${msgValidation?.password ? "visible" : "invisible"}`}>* </span>
                    {msgValidation?.password}
                </p>
            </div>
            <div className="w-full">
                <label htmlFor="confirm_password" className="text-white">Xác nhận Mật khẩu</label>
                <input type="password" id="confirm_password" value={confirmPassword} placeholder="confirm password" autoComplete="true" className="w-full px-2 py-1 border-none outline-none text-black rounded-md cursor-pointer bg-gray-300 focus-within:bg-white transition-all duration-150 ease-in-out"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <div className="w-full flex items-center justify-start gap-2">
                <input type="checkbox" checked={asArtist} id="remember" className="w-4 h-4 bg-gray-300 rounded-md cursor-pointer"
                    onChange={() => setAsArtist(!asArtist)}
                />
                <label htmlFor="remember" className="text-white">Tham gia với tư cách nghệ sĩ.</label>
            </div>
            <p className="text-white text-sm">
                <span className="cursor-pointer text-blue-600" onClick={() => setShowRegistationForm(false)}> Trở lại đăng nhập.</span>
            </p>
            <button type="submit" className="flex items-center justify-center rounded-sm px-4 py-1 text-white bg-blue-600 hover:bg-blue-800 transition-all duration-150 ease-in-out">
                Đăng kí
            </button>
        </form>
    )
}

export default RegistationForm