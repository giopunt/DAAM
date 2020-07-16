import React, { Component } from "react"
import jsonp from "jsonp"

import styles from "./newsletter.module.css"
import globalStyles from "../pages/index.module.css"

const DOMAIN_ID = "daam"
const USER_ID = "77dd2a5a3bf460239601116ed"
const CAMPAIGN_ID = "559373b904"
const MAIL_CHIMP_API_URL = `https://${DOMAIN_ID}.us10.list-manage.com/subscribe/post-json?u=${USER_ID}&amp;id=${CAMPAIGN_ID}`

class Newsletter extends Component {
  state = {
    emailAddress: "",
    status: ""
  }

  handleSubmit = async event => {
    event.preventDefault();

    const url = `${MAIL_CHIMP_API_URL}&EMAIL=${this.state.emailAddress}`

    this.setState({
      status: "sending"
    })

    jsonp(
      url,
      {
        param: "c"
      },
      (err, data) => {
        if (err) {
          this.setState({
            status: "error",
            message: err
          })
        } else if (data.result !== "success") {
          this.setState({
            status: "error",
            message: data.msg
          })
        } else {
          this.setState({
            status: "success",
            message: data.msg,
            emailAddress: ""
          })
        }
      }
    )
  }

  handleChange = event => {
    this.setState({ emailAddress: event.target.value });
  }

  render() {
    return (
      (
        <div className={styles.container}>
          <form onSubmit={this.handleSubmit} className={styles.form}>
                <input type="email" value={this.state.emailAddress} onChange={this.handleChange} name="EMAIL" className={styles.emailAddress} placeholder="mail" required />
                <div className={styles.hiddenField} aria-hidden="true">
                  <input type="text" name="b_77dd2a5a3bf460239601116ed_559373b904" tabIndex="-1" value="" readOnly />
                </div>
                <input type="submit" value="VAI" name="subscribe" className={styles.submitButton} />
          </form>
          {this.state.status === "sending" && <div className={styles.inProgressMessage}>Iscrizione in corso...</div>}
          {this.state.status === "error" && <div className={styles.errorMessage} id="newsletter-error" dangerouslySetInnerHTML={{__html: this.state.message}}/>}
          {this.state.status === "success" && <div className={styles.successMessage}>Tutto fatto, Grazie! <span role="img" aria-label="successo">👍</span></div>}
          <div><a href="https://www.iubenda.com/privacy-policy/38606123" rel="noreferrer" target="_blank" className={[styles.privacy, globalStyles.link].join(" ")}>Privacy</a></div>
        </div>
      )
    )
  }
}

export default Newsletter