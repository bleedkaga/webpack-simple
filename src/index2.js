import '@babel/polyfill'
import pic from './assets/images/hamger.png'
import './babel-test'
import './index.less'
import './index2.less'
var img = new Image()
img.src = pic;
img.classList.add('logo')
import axios from 'axios'
const fetch = () => {
    axios.get('/api/info').then(res => {
        console.log(res.data)
    })
}
fetch()
var root = document.getElementById('app')
root.appendChild(img)