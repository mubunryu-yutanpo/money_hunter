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
    backgroundColor: "#cc9b6d",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },

  user: {
    alignItems: "center",
    flexDirection: "row",
  },

  thumbnail: {
    backgroundColor: "#000",
    borderColor: "#000",
    borderRadius: 100,
    borderWidth: 2,
    height: 56,
    overflow: "hidden",
    width: 56,
    zIndex: 1,
  },

  thumbnailImage: {
    height: "100%",
    width: "100%",
  },

  userDetail: {
    flexDirection: "row",
    height: 46,
    marginLeft: -12,
  },

  userDetailBody: {
    backgroundColor: "#000",
    justifyContent: "center",
    minWidth: 132,
    paddingLeft: 22,
    paddingRight: 8,
  },

  userDetailArrow: {
    borderBottomColor: "transparent",
    borderBottomWidth: 23,
    borderLeftColor: "#000",
    borderLeftWidth: 18,
    borderTopColor: "transparent",
    borderTopWidth: 23,
    height: 0,
    width: 0,
  },

  levelRow: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 5,
  },

  userLevel: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    marginRight: 6,
  },

  expArea: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },

  expLabel: {
    color: "#d7d7d7",
    fontSize: 10,
    fontWeight: "700",
    marginRight: 4,
  },

  expBarTrack: {
    backgroundColor: "#4a4a4a",
    borderRadius: 4,
    flex: 1,
    height: 7,
    overflow: "hidden",
  },

  expBarFill: {
    backgroundColor: "#56d364",
    borderRadius: 4,
    height: "100%",
  },

  userName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  goldContainer: {
    alignItems: "center",
    backgroundColor: "#f2dac3",
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    minWidth: 120,
    paddingLeft: 8,
    paddingRight: 12,
  },

  goldThumbnail: {
    marginRight: 8,
  },

  goldImage: {
    height: 40,
    width: 40,
  },

  goldOnHand: {
    color: "#3f2a13",
    fontWeight: "800",
  },
});
