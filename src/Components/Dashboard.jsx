import React, { Component } from "react";
import * as data from "../alarms.json";
import moment from "moment";
import "../style.css";
import { alarmData, alarmOnOff } from "../Service/service.js";
export default class Dashboard extends Component {
  state = {
    data: [],
  };

  async initialData() {
    console.log("data", data.default);
    await alarmData()
      .then((res) => {
        console.log(res);
        this.setState({ data: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  componentDidMount() {
    this.initialData();
  }

  render() {
    const handlechange = async (id, e) => {
      console.log(id, e.currentTarget.value);
      var obj = {};
      if (e.currentTarget.value === "active") {
        obj[`status`] = "active";
      }
      if (e.currentTarget.value === "skip") {
        obj[`status`] = "skip";
      }
      if (e.currentTarget.value === "confirm") {
        obj[`status`] = "confirm";
      }
      await alarmOnOff(id, obj)
        .then((res) => {
          console.log(res);
          this.initialData();
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const handleDetail = async (id) => {
      this.props.history.push("/detail/" + id);
    };
    return (
      <div>
        <div className="container mt-5">
          <div className="card">
            <div className="card-body title">Alarm</div>
            <div className="col-12">
              {this.state.data.map((res, index) => (
                <>
                  <div className="col-sm-12">
                    <div
                      className={
                        res.status === "confirm"
                          ? "row alarm confirm-block"
                          : "row alarm "
                      }
                    >
                      <div
                        class={
                          res.status === "skip" ? "col-4 inactive" : "col-4 "
                        }
                      >
                        <div className="row alarmTime">
                          {moment.unix(res.alarm_time).format("h:mm")}
                        </div>
                        <div className="row">{res.name} | Alarm</div>
                      </div>
                      <div className="col-6">
                        <div className="radioDiv">
                          <div class="form-check alarm-radio">
                            <input
                              class="form-check-input"
                              type="radio"
                              name={"Radio" + index}
                              id={"Radio1" + index}
                              value="active"
                              checked={res.status === "active"}
                              onChange={(e) => handlechange(res.id, e)}
                              disabled={res.status !== "active"}
                            />
                            <label
                              class="form-check-label"
                              for={"Radio1" + index}
                            >
                              Active
                            </label>
                          </div>
                          <div class="form-check alarm-radio">
                            <input
                              class="form-check-input"
                              type="radio"
                              name={"Radio" + index}
                              id={"Radio2" + index}
                              value="skip"
                              checked={res.status === "skip"}
                              onChange={(e) => handlechange(res.id, e)}
                              disabled={res.status !== "active"}
                            />
                            <label
                              class="form-check-label"
                              for={"Radio2" + index}
                            >
                              Skip
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name={"Radio" + index}
                              id={"Radio3" + index}
                              value="confirm"
                              checked={res.status === "confirm"}
                              onChange={(e) => handlechange(res.id, e)}
                              disabled={res.status !== "active"}
                            />
                            <label
                              class="form-check-label"
                              for={"Radio3" + index}
                            >
                              Confirm
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-2 d-flex align-items-center">
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleDetail(res.id)}
                        >
                          Detail
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
