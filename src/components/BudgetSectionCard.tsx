import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { typography, colors } from '../assets/theme.ts';
import { formatToDollar } from '../utils/textFormatting.ts';
import { BudgetState } from '../screens/Budget/BudgetTabScreen.tsx';
import { BudgetItem, DeleteSectionData, sectionAPI, SectionData } from '../api/services/section.ts';
import { useAuth } from '../contexts/AuthContext.tsx';

import AddBudgetItem from './AddBudgetItem.tsx';
import DeleteSectionModal from './DeleteSectionModal.tsx';

interface BudgetSectionProps {
  section: SectionData;
  setBudgetState: React.Dispatch<React.SetStateAction<BudgetState>>;
  // subCategories: SubCategories[];
}

function BudgetSectionCard({ section, setBudgetState }: BudgetSectionProps): React.JSX.Element {
  const { userData } = useAuth();

  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showDeleteSectionModal, setShowDeleteSectionModal] = useState(false);

  let budgetItems: BudgetItem[] = [];

  const handleRemoveSection = async () => {
    try {
      const data: DeleteSectionData = {
        'user_id': userData?.user_id,
        'section_id': section.section_id
      }

      const response = await sectionAPI.deleteSection(data)
      if (response) {
        setBudgetState(prevState => {
          const newSections = { ...prevState.sections };
          delete newSections[section.section_id];
          return {
            ...prevState,
            sections: newSections
          };
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setShowDeleteSectionModal(false);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onLongPress={() => setShowDeleteSectionModal(true)}
      delayLongPress={500}
    >
      <Text style={styles.categoryTitle}>{section.name}</Text>
      <View style={styles.lineSeparator} />
      {
        budgetItems.length > 0
          ? (
            <>
              {budgetItems.map((budgetItem, index) => (
                <View key={index}>
                  <TouchableOpacity
                    style={styles.budgetItemContainer}
                    onPress={() => console.log(`${budgetItem.name} Pressed!`)}
                  >
                    <View style={styles.iconCircle}>
                      <Icon
                        name='person'
                        size={20}
                        color={colors.white}
                      />
                    </View>
                    <Text style={styles.budgetItemName}>{budgetItem.name}</Text>
                    <View style={styles.budgetItemAmount}>
                      <Text style={styles.budgetItemAmountText}>
                        {formatToDollar(budgetItem.amount)}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <View style={styles.lineSeparator} />
                </View>
              ))}
            </>
          )
          : (<Text style={styles.noBugdetItems}>No items added</Text>)
      }
      <TouchableOpacity
        style={styles.addBudgetItemContainer}
        onPress={() => setShowAddItemModal(true)}
      >
        <View style={[styles.iconCircle, { backgroundColor: colors.empty, }]}>
          <Icon
            name='add-sharp'
            size={20}
            color={colors.black}
          />
        </View>
        <Text style={styles.budgetItemName}> Add Item</Text>
      </TouchableOpacity>

      <AddBudgetItem
        isVisible={showAddItemModal}
        setIsVisible={setShowAddItemModal}
      />

      <DeleteSectionModal
        isVisible={showDeleteSectionModal}
        setIsVisible={setShowDeleteSectionModal}
        handleRemoveSection={handleRemoveSection}
      />

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  categoryTitle: {
    height: 50,
    paddingTop: 25,
    paddingLeft: 25,
    letterSpacing: 0.4,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeights.heavy,
    fontSize: typography.sizes.header,
    color: 'black',
  },
  lineSeparator: {
    height: 1.5,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: colors.secondary,
    marginVertical: 10,
  },
  budgetItemContainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 10,
    minHeight: 40,
    justifyContent: 'space-between',
  },
  iconCircle: {
    width: 30,
    height: 30,
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 25,
    paddingTop: 4,
    borderRadius: 15,
    backgroundColor: 'orange',
  },
  budgetItemName: {
    alignSelf: 'center',
    paddingLeft: 10,
    flex: 1,
    letterSpacing: 0.3,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeights.medium,
    fontSize: typography.sizes.body,
  },
  budgetItemAmount: {
    alignSelf: 'center',
    minWidth: 5,
    marginRight: 25,
    borderRadius: 10,
    backgroundColor: colors.secondary,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.20,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  budgetItemAmountText: {
    padding: 7,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeights.heavy,
    fontSize: typography.sizes.body,
  },
  noBugdetItems: {
    alignSelf: 'center',
    padding: 10,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeights.heavy,
    fontSize: typography.sizes.body,
    color: colors.inactive
  },
  addBudgetItemContainer: {
    flexDirection: 'row',
    minHeight: 40,
    justifyContent: 'space-between',
    marginBottom: 20
  },
});

export default BudgetSectionCard;
