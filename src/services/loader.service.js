import { useLoading } from "vue-loading-overlay";
import { loadingStore } from "../stores/loading.store";
const $loading = useLoading()
let loader =null
// if(loadingStore().loading) {
// // $loading.show({isFullPage : true})
// console.log("ishlayapti loader service")
// } else {
//    console.log("ishlamayapti false")
// }