import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet, Text, View, ScrollView, Image, Animated } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi imperdiet nisi quis ante malesuada consectetur. Pellentesque hendrerit, purus nec vestibulum tristique, mi enim sagittis erat, vel ullamcorper elit nulla sed libero. Cras hendrerit congue elit, a pretium est volutpat a. Suspendisse id accumsan sem, ac ullamcorper augue. Sed id quam id erat ullamcorper venenatis. Mauris semper massa a lacus placerat semper et eu justo. Nulla semper sapien non orci rutrum luctus vel ut dui. Sed in nunc scelerisque, dapibus justo a, volutpat nisl. Sed ac quam erat. In vestibulum non orci ut lobortis. Nunc sit amet nulla sed erat ultrices eleifend. Sed venenatis accumsan nibh. Maecenas justo lacus, rhoncus non tortor ac, sodales placerat nulla. Cras in facilisis diam, nec tincidunt quam. Nunc dui mauris, laoreet ac finibus sed, convallis nec erat. Suspendisse cursus at erat at dapibus.

Etiam vestibulum ante ac egestas porta. Phasellus vitae sem nec nulla imperdiet tincidunt vitae quis lacus. Duis suscipit mollis lectus non semper. Integer sit amet euismod lorem. Nullam ultricies blandit est, at porta lacus pretium in. Nullam viverra, lectus id molestie pulvinar, nunc ex scelerisque augue, id viverra tortor erat quis turpis. Aenean varius eleifend bibendum.

Proin egestas velit at ante euismod, sed feugiat est iaculis. Donec neque dui, eleifend ac gravida lacinia, placerat eget erat. Duis a massa sed metus tempor accumsan. Pellentesque vitae nulla non purus tempor efficitur commodo vitae nunc. Aenean eget semper ex. Curabitur aliquet sodales mauris in eleifend. In hac habitasse platea dictumst. Nulla gravida risus aliquam risus efficitur porta. Sed consectetur pellentesque lectus, in imperdiet sem tincidunt sed. Pellentesque lacinia odio vel nibh luctus congue. Cras aliquam orci at luctus efficitur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis luctus erat.

Vivamus erat nunc, lobortis id metus ac, auctor euismod nisi. Mauris tincidunt mollis ligula, a ullamcorper risus finibus ac. In iaculis vitae metus semper pharetra. Phasellus eleifend sapien vel finibus feugiat. Proin viverra fringilla lectus vitae ornare. Fusce consequat ipsum et libero vestibulum eleifend. Praesent eget volutpat turpis.

Vestibulum iaculis tortor at lorem egestas, viverra sodales nulla tincidunt. Pellentesque imperdiet augue felis. Maecenas elementum et dolor nec ornare. Etiam et consectetur lorem. Nunc venenatis convallis tortor ut consectetur. Phasellus aliquet rhoncus efficitur. Vivamus nec commodo sapien. Aenean eleifend metus id porttitor finibus. Proin ante turpis, rutrum vel dolor sit amet, auctor finibus lacus. Vivamus sit amet ultrices est. Phasellus tincidunt placerat metus, sed volutpat tellus venenatis eget. Ut ex eros, malesuada eget finibus sit amet, aliquet nec ex. Aliquam erat volutpat.`;

export default function App() {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const traslateY = scrollY.interpolate({
    inputRange: [-1, 0, hp(10), hp(25)],
    outputRange: [0, 0, -hp(10), 0],
    extrapolate: "clamp",
  });
  const scale = scrollY.interpolate({
    inputRange: [-hp(10), 0, hp(10)],
    outputRange: [2, 1, 0.5],
    extrapolate: "clamp",
  });
  const scaleX = scrollY.interpolate({
    inputRange: [-hp(10), 0, hp(10)],
    outputRange: [1, 1, 2],
    extrapolate: "clamp",
  });
  const traslateY_img = scrollY.interpolate({
    inputRange: [-hp(10), 0, hp(10)],
    outputRange: [-hp(15), 0, -hp(10)],
    extrapolate: "clamp",
  });
  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          position: "absolute",
          zIndex: 100,
          height: hp(10),
          width: wp(100),
          paddingTop: hp(5),
          backgroundColor: "#eee",
          transform: [{ translateY: traslateY }],
        }}
      >
        <Text style={{ fontSize: hp(4), textAlign: "center" }}>Header</Text>
      </Animated.View>
      <Animated.ScrollView
        contentContainerStyle={{ width: wp(100), paddingTop: hp(10) }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        <Animated.Image
          source={require("./assets/image.jpg")}
          style={{
            width: wp(100),
            height: hp(30),
            transform: [
              { scale: scale },
              { scaleX: scaleX },
              {
                translateY: traslateY_img,
              },
            ],
          }}
        />
        <Animated.Text style={{ fontSize: hp(2), marginHorizontal: wp(5), transform: [{ translateY: traslateY_img }] }}>{TEXT}</Animated.Text>
      </Animated.ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
