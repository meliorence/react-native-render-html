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
  const renderHtml = React.useCallback(
    ({ runId, profile }) => (
      <View key={runId} onLayout={onLayout}>
        <profile.component
          ignoredTags={ignoredTags}
          running={true}
          html={html}
          {...profile.props}
        />
      </View>
    ),
    [html, ignoredTags, onLayout]
  );
  return (
    <View>
      <Button
        title="Run Benchmark"
        onPress={launch}
        disabled={state.state !== 'WAIT_BENCH'}
      />
      <ScrollView contentContainerStyle={styles.container}>
        {match(state, {
          WAIT_BENCH: ({ benchmarks }) =>
            benchmarks ? (
              <Benchmarks benchmarks={benchmarks} />
            ) : (
              <Text>Waiting for benchmark to launch</Text>
            ),
          WAIT_RUN: renderHtml,
          RUNNING: renderHtml
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
