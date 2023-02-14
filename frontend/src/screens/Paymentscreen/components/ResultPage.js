import React, { Component } from "react";
import queryString from "query-string";
import axios from "axios";
import { orderPost } from "../../../actions/orderaction";
import store from "../../../store";
import { setcoupon } from "../../../actions/cartactions";


class ResultPage extends Component {
    state = {
        responseData: null,
        loading: true,
    };



    componentDidMount() {
        // const resourcePath = this.props.match.params.resourcePath
        console.log(this.props.location.search);

        const parsed = queryString.parse(this.props.location.search);
        console.log(parsed);
        const resourcePath = parsed.resourcePath;
        axios
            .post("http://localhost:5000/api/result", { resourcePath })
            .then((res) => {
                console.log(res.data);
                this.setState({
                    responseData: res.data,
                    loading: false,
                });
            });
    }
    checkResult = () => {
        const successPattern = /^(000\.000\.|000\.100\.1|000\.[36])/;
        const manuallPattern = /^(000\.400\.0[^3]|000\.400\.100)/;

        const match1 = successPattern.test(this.state.responseData.result.code);
        const match2 = manuallPattern.test(this.state.responseData.result.code);
        console.log(match1, match2);
        if (match1 || match2) {
console.log(this.state.responseData)
            store.dispatch(
                orderPost(
                    JSON.parse(localStorage.getItem('userInfo')).user,
                    this.state.responseData.paymentType,
                    {
                        id: this.state.responseData.id,
                        status: this.state.responseData.paymentType,
                        update_time: Date.now()
                    },
                    localStorage.getItem('tax'),
                    0,
                    localStorage.getItem('total'),
                    this.state.responseData.resultDetails.TransactionIdentfier,
                    true,
                    this.state.responseData.timestamp
                )
            );

            if (localStorage.getItem('coupon') != '') {
                store.dispatch(setcoupon(JSON.parse(localStorage.getItem('coupon'))));
                localStorage.setItem('coupon', '');
            }
            localStorage.setItem('apply', false);

            window.location.replace('/orders');
        


        } else {
            return (
                <div>
                    <h1>Failed</h1>
                    <h3>{this.state.responseData.result.description}</h3>
                </div>
            );
        }
    };
    render() {
        if (!this.state.loading) {
            return <div>{this.checkResult()}</div>;
        } else {
            return (
                <div>
                    <h1>Loading</h1>
                </div>
            );
        }
    }
}

export default ResultPage;
