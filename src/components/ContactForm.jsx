import { useState } from "react";
import axios from "../api/axiosClient";

const ContactForm = ({ formId }) => {
    const [formData, setFormData] = useState({
        "your-name": "",
        "your-email": "",
        "your-message": "",
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: "", message: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = new FormData();
        Object.keys(formData).forEach((key) => {
            payload.append(key, formData[key]);
        });

        setLoading(true);
        setStatus({ type: "", message: "" });

        try {
            const res = await axios.post(
                `/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`,
                payload,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (res.data.status === "mail_sent") {
                setStatus({ type: "success", message: res.data.message });
                setFormData({
                    "your-name": "",
                    "your-email": "",
                    "your-message": "",
                });
            } else {
                setStatus({ type: "error", message: res.data.message });
            }
        } catch (err) {
            setStatus({ type: "error", message: err });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-form">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        name="your-name"
                        className="form-control"
                        placeholder="Họ tên"
                        value={formData["your-name"]}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="email"
                        name="your-email"
                        className="form-control"
                        placeholder="Email"
                        value={formData["your-email"]}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <textarea
                        name="your-message"
                        className="form-control"
                        placeholder="Nội dung"
                        rows="5"
                        value={formData["your-message"]}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Đang gửi..." : "Gửi liên hệ"}
                </button>

                {status.message && (
                    <div
                        className={`alert mt-3 ${status.type === "success" ? "alert-success" : "alert-danger"
                            }`}
                    >
                        {status.message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default ContactForm;
