import React, { Component } from "react";
import * as data from "../alarms.json";
import moment from "moment";
import "../style.css";
import { alarmOnOff, alarmDataByID } from "../Service/service.js";
export default class Detail extends Component {
  state = {
    data: {},
  };

  async initialData() {
    console.log("data", data.default);
    await alarmDataByID(this.props.match.params.id)
      .then((res) => {
        console.log(res);
        this.setState({ data: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  componentDidMount() {
    console.log(this.props);
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

    const handleBack = () => {
      this.props.history.push("/");
    };
    return (
      <div>
        <div className="container mt-5">
          <div className="card">
            <div className="card-body title">
              <div className="title-body">
                <svg
                  width="5em"
                  height="3em"
                  viewBox="0 0 16 16"
                  class="bi bi-arrow-left"
                  fill="#ffff"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => handleBack()}
                >
                  <path
                    fill-rule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
                <h1 className="titeltext">Alarm Detail</h1>
              </div>
            </div>

            <div className="col-12 alarmDiv">
              <>
                <div className="col-sm-12">
                  <div className="row alarmd">
                    <div class="col-12">
                      <div className="row">
                        <label className="label">Alarm Time : </label>
                        <p>
                          {moment
                            .unix(this.state.data.alarm_time)
                            .format("h:mm")}
                        </p>
                      </div>
                      <div className="row">
                        <label className="label">Alarm Name :</label>{" "}
                        <p>{this.state.data.name}</p>
                      </div>
                      <div className="row">
                        <label className="label">Status :</label>
                        <div class="form-check alarm-radio">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="Radio"
                            id="Radio1"
                            value="active"
                            checked={this.state.data.status === "active"}
                            onChange={(e) =>
                              handlechange(this.state.data.id, e)
                            }
                            disabled={this.state.data.status !== "active"}
                          />
                          <label class="form-check-label" for="Radio1">
                            Active
                          </label>
                        </div>
                        <div class="form-check alarm-radio">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="Radio"
                            id="Radio2"
                            value="skip"
                            checked={this.state.data.status === "skip"}
                            onChange={(e) =>
                              handlechange(this.state.data.id, e)
                            }
                            disabled={this.state.data.status !== "active"}
                          />
                          <label class="form-check-label" for="Radio2">
                            Skip
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="Radio"
                            id="Radio3"
                            value="confirm"
                            checked={this.state.data.status === "confirm"}
                            onChange={(e) =>
                              handlechange(this.state.data.id, e)
                            }
                            disabled={this.state.data.status !== "active"}
                          />
                          <label class="form-check-label" for="Radio3">
                            Confirm
                          </label>
                        </div>
                      </div>
                      <div className="row">
                        <label className="label">Description :</label>
                        <p className="desc">{this.state.data.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
