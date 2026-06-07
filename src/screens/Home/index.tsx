import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../shared/colors';

function Header({ query, onChangeQuery }: { query: string; onChangeQuery: (t: string) => void }) {
  return (
    <View style={styles.header}>
      <View style={styles.locRow}>
        <Ionicons name="location-outline" size={18} color="#8ecfa8" />
        <Text style={styles.locText}>Ananindeua, PA</Text>
        <Ionicons name="chevron-down-outline" size={15} color="#8ecfa8" />
      </View>
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={16} color="rgba(255,255,255,0.5)" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar módulos..."
          placeholderTextColor="rgba(255,255,255,0.5)"
          value={query}
          onChangeText={onChangeQuery}
        />
      </View>
    </View>
  );
}

function Chips({ isGrid, onToggleLayout }: { isGrid: boolean; onToggleLayout: () => void }) {
  return (
    <View style={styles.chips}>
      <TouchableOpacity style={styles.chipOn} onPress={onToggleLayout}>
        <Ionicons name={isGrid ? 'grid-outline' : 'list-outline'} size={14} color="#fff" />
        <Text style={styles.chipOnText}>Todos</Text>
      </TouchableOpacity>
      {/* <View style={styles.chipOff}>
        <Ionicons name="shield-outline" size={14} color="#666" />
        <Text style={styles.chipOffText}>Segurança</Text>
      </View>*/}
    </View>
  );
}



function SectionHeader({ label, onMore }: { label: string; onMore?: () => void }) {
  return (
    <View style={styles.sectionRow}>
      <Text style={styles.sectionLabel}>{label}</Text>
      
    </View>
  );
}

function ModuleCard({
  icon,
  iconColor,
  iconBg,
  name,
  //sub,
  badgeLabel,
  badgeVariant,
  isGrid,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBg: string;
  name: string;
  //sub: string;
  badgeLabel: string;
  badgeVariant: 'green' | 'red';
  isGrid?: boolean;
}) {
  return (
    <View style={[styles.card, isGrid ? styles.cardGrid : styles.cardList]}>
      <View style={[styles.cardIcon, { backgroundColor: iconBg }]}>
        <Ionicons name={icon} size={22} color={iconColor} />
      </View>
      <Text style={styles.cardName}>{name}</Text>
      
      <View
        style={[
          styles.badge,
          badgeVariant === 'green' ? styles.badgeGreen : styles.badgeRed,
        ]}
      >
       
        <Text
          style={[
            styles.badgeText,
            badgeVariant === 'green' ? styles.badgeTextGreen : styles.badgeTextRed,
          ]}
        >
          {badgeLabel}
        </Text>
      </View>
    </View>
  );
}

const ALL_CARDS: { name: string; icon: keyof typeof Ionicons.glyphMap; badgeVariant: 'green' | 'red' }[] = [
  { name: 'Checklist', icon: 'clipboard-outline', badgeVariant: 'green' },
  { name: 'Distribuir EPI', icon: 'clipboard-outline', badgeVariant: 'green' },
  { name: 'Controle de ASO', icon: 'clipboard-outline', badgeVariant: 'green' },
  { name: 'Controle de Vacina', icon: 'clipboard-outline', badgeVariant: 'green' },
  { name: 'Configurar Formulario', icon: 'clipboard-outline', badgeVariant: 'green' },
  { name: 'Inventario de EPI', icon: 'clipboard-outline', badgeVariant: 'green' },
  { name: 'Inventario', icon: 'clipboard-outline', badgeVariant: 'green' },
  { name: 'Cadastrar Biometria', icon: 'clipboard-outline', badgeVariant: 'green' },
  { name: 'Hospedaria', icon: 'clipboard-outline', badgeVariant: 'green' },
  { name: 'Uniforme', icon: 'clipboard-outline', badgeVariant: 'green' },
];

export function HomeScreen() {
  const [isGrid, setIsGrid] = useState(true);
  const [query, setQuery] = useState('');

  const filteredCards = query.trim()
    ? ALL_CARDS.filter(c => c.name.toLowerCase().startsWith(query.toLowerCase()))
    : ALL_CARDS;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Header query={query} onChangeQuery={setQuery} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Chips isGrid={isGrid} onToggleLayout={() => setIsGrid(g => !g)} />

        {filteredCards.length === 0 ? (
          <View style={styles.emptyState}>
            {/* <Ionicons name="search-outline" size={36} color={colors.textFaint} /> */}
            <Text style={styles.emptyText}>Módulo não existe</Text>
          </View>
        ) : (
          <View style={[styles.cards, isGrid && styles.cardsGrid]}>
            {filteredCards.map(card => (
              <ModuleCard
                key={card.name}
                icon={card.icon}
                iconColor={colors.primary}
                iconBg={colors.badgeGreenBg}
                name={card.name}
                badgeLabel="Ativo"
                badgeVariant={card.badgeVariant}
                isGrid={isGrid}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 18,
    paddingTop: 16,
    paddingBottom: 28,
  },

  // Header
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 16,
  },
  locRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
  },
  locText: {
    fontSize: 15,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
  },
  searchBar: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: '#fff',
    padding: 0,
  },

  // Chips
  chips: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  chipOn: {
    backgroundColor: colors.primary,
    borderRadius: 22,
    paddingVertical: 8,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  chipOnText: {
    fontSize: 13,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
  },
  chipOff: {
    borderWidth: 1.5,
    borderColor: colors.chipBorder,
    borderRadius: 22,
    paddingVertical: 8,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.white,
  },
  chipOffText: {
    fontSize: 13,
    fontFamily: 'Poppins_700Bold',
    color: colors.chipText,
  },

  // Banner
  banner: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  bannerTitle: {
    fontSize: 17,
    fontFamily: 'Poppins_800ExtraBold',
    color: '#fff',
  },
  bannerSub: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
    lineHeight: 18,
  },
  bellCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Section
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 14,
    fontFamily: 'Poppins_800ExtraBold',
    color: colors.textDark,
  },
  sectionMore: {
    fontSize: 13,
    fontFamily: 'Poppins_700Bold',
    color: colors.notifRed,
  },

  // Cards
  cards: {
    flexDirection: 'column',
    gap: 12,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    paddingBottom: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  cardList: {
    // full width naturally in column flex
  },
  cardGrid: {
    width: '48%',
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  cardName: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: colors.textDark,
  },
  cardSub: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: '#bbb',
    marginTop: 2,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 10,
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 9,
    alignSelf: 'flex-start',
  },
  badgeGreen: {
    backgroundColor: colors.badgeGreenBg,
  },
  badgeRed: {
    backgroundColor: colors.badgeRedBg,
  },
  badgeText: {
    fontSize: 11,
    fontFamily: 'Poppins_700Bold',
  },
  badgeTextGreen: {
    color: colors.primary,
  },
  badgeTextRed: {
    color: colors.badgeRed,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    gap: 12,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.textFaint,
  },
});
