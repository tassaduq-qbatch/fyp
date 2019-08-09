import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import TouchButton from "../../small_components/touch_button";
import StarRating from "react-native-star-rating";
import hallImg from "../../../../images/china_wall.jpg";

import {
  widthPercentageToDP as widthP,
  heightPercentageToDP as heightP
} from "react-native-responsive-screen";

export default class ManageBookings extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true, //check if json data fetch online
      dataSource: [], //store an object of json data
      id: 0,
      cid: 0,
      type: ""
    };
  }

  _approvedMessage() {
    //alert(this.state.type);
    if (this.state.type === "Hall") {
      var url =
        "https://eventhub-api.conveyor.cloud/api/Owner/ApprovePendingRequestHall?id=" +
        this.state.id +
        "&cid=" +
        this.state.cid;
    } else if (this.state.type === "Media") {
      var url =
        "https://eventhub-api.conveyor.cloud/api/Owner/ApprovePendingRequestMedia?id=" +
        this.state.id +
        "&cid=" +
        this.state.cid;
    } else if (this.state.type === "Caterer") {
      var url =
        "https://eventhub-api.conveyor.cloud/api/Owner/ApprovePendingRequestCaterer?id=" +
        this.state.id +
        "&cid=" +
        this.state.cid;
    }

    fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .catch(error => console.error("Error :", error))
      .then(res => {
        this.setState({ data: res });
        if (this.state.data == 0) {
          alert("no booking found");
        }
      });
  }
  ApprovePendingRequest() {}
  _disapprovedMessage() {
    alert("Booking has disapproved");
  }

  componentDidMount() {
    //set state value
    this.setState({
      isLoading: false, //already loading
      dataSource: data.info //write name of array which contains json data
    });
  }
  render() {
    //show waiting screen when json data is fetching
    if (this.state.isLoading) {
      return <View style={{ flex: 1, paddingTop: 20 }} />;
    }
    const { navigation } = this.props;
    const hall = navigation.getParam("Object");
    this.state.cid = hall.companyID;
    this.state.id = hall.b_id;
    this.state.type = hall.companyType;

    return (
      <View style={styles.container}>
        <View style={{ alignItems: "center", marginVertical: heightP("3%") }}>
          <Image style={styles.img} source={hallImg} />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 5
          }}
        >
          <View style={{ justifyContent: "center" }}>
            <Text style={{ fontSize: 30, fontWeight: "100", color: "green" }}>
              {hall.userEmail}
            </Text>
            <Text style={styles.txt}>{hall.eventDate} starts from</Text>
            <Text style={styles.txt}>{hall.companyType} Time Required</Text>
            <Text style={styles.txt}>{hall.pricePerHead} Rs/-(per head)</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchButton
              On_Press={this._approvedMessage.bind(this)}
              InText="Approve"
            />
            <TouchButton
              On_Press={this._disapprovedMessage.bind(this)}
              InText="Disapprove"
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  cat: {
    backgroundColor: "#31708E",
    padding: 10,
    borderRadius: 70,
    marginRight: 15,
    marginBottom: 20,
    marginLeft: 30,
    width: "80%"
  },
  img: {
    width: widthP("95%"),
    height: heightP("20%"),
    borderColor: "#3C3C3C",
    borderWidth: 2,
    borderRadius: 10
  },
  txt: {
    fontSize: 18
  },
  info: {
    fontSize: 18,
    color: "white",
    borderRadius: 20,
    marginBottom: 15,
    marginLeft: 5,
    textAlign: "center"
  }
});
