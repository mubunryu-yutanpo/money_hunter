import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

type GameHeaderProps = {
  playerName: string;
  level?: number;
  exp: number;
  expRequired: number;
  gold?: number;
};

export function GameHeader({
  playerName,
  level,
  exp,
  expRequired,
  gold,
}: GameHeaderProps) {
  const expProgress =
    expRequired > 0 ? Math.min(Math.max(exp / expRequired, 0), 1) : 0;
  const expProgressWidth = `${Math.round(expProgress * 100)}%` as `${number}%`;

  return (
    <View style={styles.header}>
      <View style={styles.user}>
        <View style={styles.thumbnail}>
          <Image
            accessibilityLabel={`${playerName}のアイコン`}
            source={require("@/assets/images/ui/test-user.png")}
            style={styles.thumbnailImage}
            contentFit="contain"
          />
        </View>

        <View style={styles.userDetail}>
          <View style={styles.userDetailBody}>
            <View style={styles.levelRow}>
              <Text style={styles.userLevel}>Lv.{level ?? "1"}</Text>

              <View style={styles.expArea}>
                <Text style={styles.expLabel}>EXP</Text>
                <View style={styles.expBarTrack}>
                  <View
                    style={[
                      styles.expBarFill,
                      { width: expProgressWidth },
                    ]}
                  />
                </View>
              </View>
            </View>

            <Text style={styles.userName}>{playerName}</Text>
          </View>

          <View style={styles.userDetailArrow} />
        </View>
      </View>

      <View style={styles.goldContainer}>
        <View style={styles.goldThumbnail}>
          <Image
            accessibilityLabel="ゴールド"
            source={require("@/assets/images/ui/gold.png")}
            style={styles.goldImage}
            contentFit="contain"
          />
        </View>

        <Text style={styles.goldOnHand}>
          {gold === undefined ? "0 G" : `${gold.toLocaleString()} G`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#cc9b6d",
  },

  user: {
    flexDirection: "row",
    alignItems: "center",
  },

  thumbnail: {
    width: 56,
    height: 56,
    backgroundColor: "#000",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 100,
    overflow: "hidden",
    zIndex: 1,
  },

  thumbnailImage: {
    width: "100%",
    height: "100%",
  },

  userDetail: {
    flexDirection: "row",
    height: 46,
    marginLeft: -12,
  },

  userDetailBody: {
    minWidth: 132,
    justifyContent: "center",
    paddingLeft: 22,
    paddingRight: 8,
    backgroundColor: "#000",
  },

  userDetailArrow: {
    width: 0,
    height: 0,
    borderTopWidth: 23,
    borderBottomWidth: 23,
    borderLeftWidth: 18,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "#000",
  },

  levelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  userLevel: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    marginRight: 6,
  },

  expArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  expLabel: {
    color: "#d7d7d7",
    fontSize: 10,
    fontWeight: "700",
    marginRight: 4,
  },

  expBarTrack: {
    flex: 1,
    height: 7,
    backgroundColor: "#4a4a4a",
    borderRadius: 4,
    overflow: "hidden",
  },

  expBarFill: {
    height: "100%",
    backgroundColor: "#56d364",
    borderRadius: 4,
  },

  userName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  goldContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f2dac3",
    borderRadius: 100,
    minWidth: 120,
    paddingLeft: 8,
    paddingRight: 12,
  },

  goldThumbnail: {
    marginRight: 8,
  },

  goldImage: {
    width: 40,
    height: 40,
  },

  goldOnHand: {
    color: "#3f2a13",
    fontWeight: "800",
  },
});
