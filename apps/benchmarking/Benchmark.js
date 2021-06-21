/* eslint-disable no-undef */
import * as React from 'react';
import { ScrollView, StyleSheet, View, Text, Button } from 'react-native';
import { mean } from 'ramda';
import { match } from 'react-states';
import useBenchmark from './useBenchmark';

function Benchmarks({ benchmarks }) {
  return (
    <View>
      <Text>
        Average Time to Render:{'\n'}
        {benchmarks.map((e) => `${e.name}: ${mean(e.values).toFixed(2)}ms\n`)}
      </Text>
    </View>
  );
}

export default function Benchmark({ samples, html, ignoredTags }) {
  const { onLayout, launch, ...state } = useBenchmark({
    runs: samples
  });
  return (
    <View>
      <Button
        title="Run Benchmark"
        onPress={launch}
        disabled={state.state !== 'WAIT_BENCH'}
      />
      <ScrollView
        onContentSizeChange={onLayout}
        contentContainerStyle={styles.container}>
        {match(state, {
          WAIT_BENCH: ({ benchmarks }) =>
            benchmarks ? (
              <Benchmarks benchmarks={benchmarks} />
            ) : (
              <Text>Waiting for benchmark to launch</Text>
            ),
          WAIT_RUN: () => {
            return null;
          },
          RUNNING: ({ runId, profile }) => (
            <profile.component
              ignoredTags={ignoredTags}
              running={true}
              key={runId}
              html={html}
            />
          )
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  }
});
