import React from 'react';
import Navbar from '../component/Navbar';

const About = () => {
    return (
        <>
            <Navbar />
            <div className="container mt-5">

                {/* Intro Section */}
                <div className="row align-items-center mb-5">
                    <div className="col-md-6 text-center mb-4 mb-md-0">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3595/3595455.png"
                            alt="About NearBuy"
                            className="img-fluid"
                            style={{ maxHeight: '300px' }}
                        />
                    </div>
                    <div className="col-md-6">
                        <h2 className="fw-bold">About <span className="text-primary">𝒩𝑒𝒶𝓇𝐵𝓊𝓎</span></h2>
                        <p className="text-muted fs-5 mt-3">
                            <strong>NearBuy</strong> connects you to the shops you love around the corner. From groceries to gadgets, discover and order directly from your neighborhood’s best — anytime, anywhere.
                        </p>
                        <h5 className="mt-4">🌟 Our Mission</h5>
                        <p className="text-muted">
                            To empower local businesses with modern tools and provide customers a seamless local shopping experience.
                        </p>
                    </div>
                </div>

                {/* Team Section */}
                <div className="text-center my-5">
                    <h3 className="fw-bold mb-4">👥 Meet Our Team</h3>
                    <div className="row justify-content-center">
                        {[
                            { name: "Aarav Gupta", role: "Founder & CEO", img: "https://randomuser.me/api/portraits/men/32.jpg" },
                            { name: "Meera Kapoor", role: "Product Designer", img: "https://randomuser.me/api/portraits/women/44.jpg" },
                            { name: "Rishi Verma", role: "Full Stack Developer", img: "https://randomuser.me/api/portraits/men/76.jpg" },
                        ].map((member, idx) => (
                            <div className="col-md-3 col-8 mb-4" key={idx}>
                                <div className="card shadow-sm border-0">
                                    <img src={member.img} className="card-img-top rounded-circle mx-auto mt-3" alt={member.name} style={{ width: '120px', height: '120px', objectFit: 'cover' }} />
                                    <div className="card-body text-center">
                                        <h6 className="card-title">{member.name}</h6>
                                        <p className="text-muted small">{member.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Testimonials */}
                <div className="bg-light p-5 rounded shadow-sm mb-5">
                    <h3 className="text-center fw-bold mb-4">💬 What Our Users Say</h3>
                    <div className="row">
                        {[
                            { name: "Pooja S.", review: "NearBuy makes it so easy to support my local kirana store. I love the quick delivery and clean UI!" },
                            { name: "Ravi M.", review: "A perfect way to stay connected with small shops in my area. Love the mission and simplicity!" },
                            { name: "Sana K.", review: "The team behind NearBuy really cares — this app is a blessing for local business!" },
                        ].map((testimonial, idx) => (
                            <div className="col-md-4 mb-3" key={idx}>
                                <div className="card h-100 border-0 shadow-sm">
                                    <div className="card-body">
                                        <p className="card-text text-muted">“{testimonial.review}”</p>
                                        <h6 className="card-subtitle text-end mt-3 text-dark">— {testimonial.name}</h6>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Section */}
                <div className="text-center mb-5">
                    <h3 className="fw-bold">📞 Get in Touch</h3>
                    <p className="text-muted">Have questions, suggestions, or feedback? We’d love to hear from you!</p>
                    <p>
                        <strong>Email:</strong> <a href="mailto:support@nearbuy.in">support@nearbuy.in</a><br />
                        <strong>Phone:</strong> +91 95259 78994 
                    </p>
                </div>

                <div className="text-center text-secondary mb-4">
                    <small>&copy; 2025 NearBuy. Made with ❤️ in India.</small>
                </div>
            </div>
        </>
    );
};

export default About;
