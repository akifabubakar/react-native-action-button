/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import ActionButton from "react-native-action-button";

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const padding = 0

  if(contentSize.height<layoutMeasurement.height){
      return false
  }

  return layoutMeasurement.height + contentOffset.y >= contentSize.height + padding;
};

const App: () => React$Node = () => {
  const [animate,setAnimation]=useState("bounceIn");
  const [orientation,setOrientation]=useState(()=>{var {height,width} = Dimensions.get("window"); return height>width? "vertical":"horizontal"});
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView onLayout={()=>{
        var {height,width} = Dimensions.get("window");
        if(height>width){
          setOrientation("vertical");
        }else{
          setOrientation("horizontal");
        }
        }}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
          onScroll={({nativeEvent}) => {
            if (isCloseToBottom(nativeEvent)) {
                setAnimation("bounceOut")
            } else {
              setAnimation("bounceIn")
            }
            }}
          >
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>

        <ActionButton buttonColor="rgba(231,76,60,1)" orientation={orientation} animate={animate} bgColor={'rgba(0,0,0,0.3)'} offsetX={15} offsetY={50} horizontalSpacing={50} horizontalOrientation={'right'}>
          <ActionButton.Item buttonColor='#5659b6' title="Add" onPress={() => console.log("notes tapped!")}>
            <Text> Test </Text>
          </ActionButton.Item>
          
          <ActionButton.Item buttonColor='#9b59b6' title="Add Gateway" onPress={() => console.log("notes tapped!")}>
            <Text> Test </Text>
          </ActionButton.Item>
          
          <ActionButton.Item buttonColor='#821221' title="New Task" onPress={() => console.log("notes tapped!")}>
            <Text> Test </Text>
          </ActionButton.Item>
        </ActionButton>

      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
