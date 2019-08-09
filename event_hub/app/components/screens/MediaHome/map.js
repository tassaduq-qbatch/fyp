import React, { Component } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/MaterialIcons";
export default class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hall1: ""
    };
  }
  render() {
    const nav = this.props.navigation;
    //const type = this.props.obj;
    let media = this.props.media;
    // console.warn(hall);
    return (
      <View style={{ paddingHorizontal: 30 }}>
        <Text style={{ fontSize: 25, color: "green" }}>{media.name}</Text>
        <Text>{media.city}</Text>
        <View style={{ flexDirection: "row", marginVertical: hp("1%") }}>
          <Icon name="location-on" size={15} color="green" />
          <Text style={{ color: "green" }}>5.2 Miles From Location</Text>
        </View>
        <Text>{media.noOfCams} camers</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#003300",
    marginTop: hp("0.5%"),
    width: wp("100%"),
    height: hp("15%")
  }
});
