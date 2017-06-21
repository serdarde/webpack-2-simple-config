// import css
import "./style.scss";
import "bootstrap/scss/bootstrap.scss";

// put something in display
document.getElementById('root').innerHTML = "<h2>Enjoy It</h2>"

// enable hot loading
if(module.hot){
  module.hot.accept();
}