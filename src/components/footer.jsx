import "./footer.css";
const Footer = () => {
  return (
    <>
      <div className="container-fluid bg-secondary py-5">
        <div className="row">
          <div className="col-12 col-md-4">
            <div className="col-8 ms-auto mt-4 mt-lg-0">
              <h5 className="text-light mb-3">Krishbeauty</h5>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="col-8 ms-lg-auto text-light mt-4 mt-lg-0">
              <h5 className="text-light mb-3">Our Store</h5>

              <p>
                Address: Lzp023 lozinko plaza beside rivers gate tradefair
                complex
              </p>
              <p>Mon-Fri:8am-7pm</p>
              <p>Sat-Sun:8am-5pm</p>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="col-8 mx-lg-auto text-light mt-4 mt-lg-0">
              <h5 className="text-light mb-3">Customer Service</h5>
              <p>Tel: 09037399585</p>
              <p>E-mail: Krishibeauty@gmail.com</p>
              <div className="d-flex justify-content-between ">
                <a href="" className="text-light">
                  <span className="fa-brands fa-facebook"></span>
                </a>
                <a href="" className="text-light">
                  <span className="fa-brands fa-instagram"></span>
                </a>
                <a href="" className="text-light">
                  <span className="fa-brands fa-tiktok"></span>
                </a>
                <a href="" className="text-light">
                  <span className="fa-brands fa-twitter"></span>
                </a>
                <a href="" className="text-light">
                  <span className="fa-brands fa-whatsapp"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-muted text-center bg-dark mb-0">
        All rights reserverd. &copy; {new Date().getFullYear()}
      </p>
    </>
  );
};

export default Footer;
