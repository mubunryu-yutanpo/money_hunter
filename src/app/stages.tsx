import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { STAGES } from "@/data/stages";

export default function StagesScreen() {
  const [selectedStageId, setSelectedStageId] = useState<number | null>(null);
  const displayedStages = [...STAGES].reverse();
  const selectedStage = STAGES.find((stage) => stage.id === selectedStageId);

  return (
    <View style={styles.container}>
      <Text style={styles.areaName}>はじまりのエリア</Text>
      <Text style={styles.guide}>進みたいステージを選んでください</Text>

      <View style={styles.map}>
        <View style={styles.routeLine} />

        {displayedStages.map((stage, index) => {
          const isSelected = stage.id === selectedStageId;
          const showLabelOnLeft = index % 2 === 0;

          return (
            <View key={stage.id} style={styles.stageRow}>
              <View style={styles.labelArea}>
                {showLabelOnLeft ? (
                  <View style={styles.stageLabel}>
                    <Text style={styles.stageName}>{stage.name}</Text>
                    <Text style={styles.difficulty}>
                      難易度 {"★".repeat(stage.difficulty)}
                    </Text>
                  </View>
                ) : null}
              </View>

              <Pressable
                accessibilityLabel={`${stage.name}${stage.isUnlocked ? "" : "、未解放"}`}
                accessibilityRole="button"
                accessibilityState={{
                  disabled: !stage.isUnlocked,
                  selected: isSelected,
                }}
                disabled={!stage.isUnlocked}
                hitSlop={8}
                onPress={() => setSelectedStageId(stage.id)}
                style={({ pressed }) => [
                  styles.stageNode,
                  stage.isUnlocked
                    ? styles.stageNodeUnlocked
                    : styles.stageNodeLocked,
                  isSelected && styles.stageNodeSelected,
                  pressed && styles.stageNodePressed,
                ]}
              >
                <Text
                  style={[
                    styles.stageNumber,
                    !stage.isUnlocked && styles.stageNumberLocked,
                  ]}
                >
                  {stage.isUnlocked ? stage.id : "🔒"}
                </Text>
              </Pressable>

              <View style={styles.labelArea}>
                {!showLabelOnLeft ? (
                  <View style={styles.stageLabel}>
                    <Text style={styles.stageName}>{stage.name}</Text>
                    <Text style={styles.difficulty}>
                      難易度 {"★".repeat(stage.difficulty)}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.selectionPanel}>
        <Text style={styles.selectionText}>
          {selectedStage
            ? `${selectedStage.name}を選択中`
            : "光っているステージをタップできます"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#edf4df",
    flex: 1,
    padding: 20,
  },

  areaName: {
    color: "#3f2a13",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 6,
  },

  guide: {
    color: "#6f6255",
    fontSize: 14,
  },

  map: {
    flex: 1,
    marginVertical: 16,
    maxWidth: 440,
    position: "relative",
    width: "100%",
  },

  routeLine: {
    backgroundColor: "#b49a70",
    bottom: "10%",
    left: "50%",
    marginLeft: -4,
    position: "absolute",
    top: "10%",
    width: 8,
  },

  stageRow: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    zIndex: 1,
  },

  labelArea: {
    flex: 1,
    paddingHorizontal: 10,
  },

  stageLabel: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderColor: "#d7c8a8",
    borderRadius: 10,
    borderWidth: 1,
    padding: 8,
  },

  stageName: {
    color: "#3f2a13",
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
  },

  difficulty: {
    color: "#8b6f47",
    fontSize: 10,
    marginTop: 3,
    textAlign: "center",
  },

  stageNode: {
    alignItems: "center",
    borderRadius: 40,
    borderWidth: 4,
    height: 76,
    justifyContent: "center",
    width: 76,
  },

  stageNodeUnlocked: {
    backgroundColor: "#f3c64e",
    borderColor: "#fff4ad",
    shadowColor: "#6f4e2f",
    shadowOffset: { height: 3, width: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  stageNodeLocked: {
    backgroundColor: "#aaa59e",
    borderColor: "#d8d4ce",
    opacity: 0.8,
  },

  stageNodeSelected: {
    borderColor: "#fff",
    borderWidth: 6,
    transform: [{ scale: 1.08 }],
  },

  stageNodePressed: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
  },

  stageNumber: {
    color: "#4a3518",
    fontSize: 26,
    fontWeight: "900",
  },

  stageNumberLocked: {
    fontSize: 22,
  },

  selectionPanel: {
    backgroundColor: "#fff",
    borderColor: "#d7c8a8",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
    width: "100%",
  },

  selectionText: {
    color: "#3f2a13",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
});
