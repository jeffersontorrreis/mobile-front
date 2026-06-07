import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/auth.context';
import { colors } from '../../shared/colors';

function ProfileHeader() {
  return (
    <View style={styles.pHeader}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>JT</Text>
      </View>
      <View>
        <Text style={styles.pName}>Jefferson Torres</Text>
        <TouchableOpacity>
          <Text style={styles.pLink}>
            Informações email e cargo{' '}
            {/** <Ionicons name="chevron-forward-outline" size={13} color={colors.primary} />*/}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function SectionLabel({ label }: { label: string }) {
  return <Text style={styles.secLabel}>{label}</Text>;
}

function ListRow({
  icon,
  label,
  sub,
  badge,
  danger,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  sub?: string;
  badge?: string;
  danger?: boolean;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.rowIcon, danger && styles.rowIconDanger]}>
        <Ionicons name={icon} size={22} color={danger ? colors.badgeRed : colors.primary} />
      </View>
      <View style={styles.rowContent}>
        <Text style={[styles.rowLabel, danger && styles.rowLabelDanger]}>{label}</Text>
        {sub && <Text style={styles.rowSub}>{sub}</Text>}
      </View>
      {badge && (
        <View style={styles.nbadge}>
          <Text style={styles.nbadgeText}>{badge}</Text>
        </View>
      )}
      <Ionicons name="chevron-forward-outline" size={17} color="#ccc" />
    </TouchableOpacity>
  );
}

export function ProfileScreen() {
  const { signOut } = useAuth();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader />

         <SectionLabel label="EMPRESA" />
        <View style={styles.list}>
          <ListRow
            icon="chatbubble-outline"
            label="AGROPALMA"
          />
        </View>

        <SectionLabel label="SOBRE" />
        <View style={styles.list}>
          <ListRow
            icon="shield-outline"
            label="Termos de uso "
            //sub="Política de privacidade e termos de uso"
          />
          <ListRow
            icon="fitness-outline"
            label="Politica de privacidade"
            //sub="Dúvidas, sugestões ou elogios? Envie-nos uma mensagem!"
          />
        </View>

        {/** <SectionLabel label="CONTA" />  */}
        <View style={styles.list}>
          <ListRow
            icon="log-out-outline"
            label="Sair"
            danger
            onPress={signOut}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Header
  pHeader: {
    backgroundColor: colors.background,
    paddingVertical: 24,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
  },
  pName: {
    fontSize: 20,
    fontFamily: 'Poppins_800ExtraBold',
    color: colors.textDark,
    letterSpacing: 1,
  },
  pLink: {
    fontSize: 13,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.primary,
    marginTop: 3,
  },

  // Section label
  secLabel: {
    fontSize: 11,
    fontFamily: 'Poppins_700Bold',
    color: '#bbb',
    letterSpacing: 1.5,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 6,
  },

  // List
  list: {
    backgroundColor: colors.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f0',
  },
  rowIcon: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: colors.badgeGreenBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowIconDanger: {
    backgroundColor: colors.badgeRedBg,
  },
  rowContent: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.textDark,
  },
  rowLabelDanger: {
    color: colors.badgeRed,
  },
  rowSub: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: '#bbb',
    marginTop: 2,
  },
  nbadge: {
    backgroundColor: colors.notifRed,
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 9,
  },
  nbadgeText: {
    fontSize: 11,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
  },
});
