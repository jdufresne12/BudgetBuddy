import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { typography, colors } from '../assets/theme.ts';
import { formatToDollar } from '../utils/textFormatting.ts';
import { BudgetState } from '../screens/Budget/BudgetTabScreen.tsx';
import { DeleteSectionData, sectionAPI, SectionData } from '../api/services/section.ts';
import { budgetAPI, BudgetItem, GetSectionsItemsData } from '../api/services/budget';

import { useAuth } from '../contexts/AuthContext.tsx';

import AddBudgetItem from './AddBudgetItem.tsx';
import EditBudgetItem from './EditBudgetItem.tsx';
import DeleteSectionModal from './DeleteSectionModal.tsx';

interface BudgetSectionProps {
  section: string;
  budgetItems: BudgetItem[];
  setBudgetState: React.Dispatch<React.SetStateAction<BudgetState>>;
}

function BudgetSectionCard({ section, budgetItems, setBudgetState }: BudgetSectionProps): React.JSX.Element {
  const { userData } = useAuth();
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showEditItemModal, setShowEditItemModal] = useState(false);
  const [showDeleteSectionModal, setShowDeleteSectionModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BudgetItem | null>(null);

  useEffect(() => {
    console.log(budgetItems)
  }, [budgetItems])

  // useEffect(() => {
  //   getItems();
  // }, []);

  const getItems = async () => {
    try {
      const data: GetSectionsItemsData = {
        'user_id': userData?.user_id,
        'section': section,
      };
      // const response: BudgetItem[] = await budgetAPI.getSectionsItems(data);

    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveSection = async () => {
    // Currently not being used
    try {
      const data: DeleteSectionData = {
        'user_id': userData?.user_id,
        'section': section
      }
      // const response = await sectionAPI.deleteSection(data)
    } catch (error) {
      console.error(error);
    } finally {
      setShowDeleteSectionModal(false);
    }
  };

  const handleEditItem = (budgetItem: BudgetItem) => {
    setSelectedItem(budgetItem);
    setShowEditItemModal(true);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onLongPress={() => console.log("setShowDeleteSectionModal(true)")}
      delayLongPress={500}
    >
      <Text style={styles.categoryTitle}>{section}</Text>
      <View style={styles.lineSeparator} />
      {
        budgetItems?.length > 0
          ? (
            <>
              {budgetItems.map((budgetItem) => (
                <View key={budgetItem.item_id}>
                  <TouchableOpacity
                    style={styles.budgetItemContainer}
                    onPress={() => handleEditItem(budgetItem)}
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
        <Text style={styles.budgetItemName}>Add Item</Text>
      </TouchableOpacity>

      <AddBudgetItem
        isVisible={showAddItemModal}
        setIsVisible={setShowAddItemModal}
        section={section}
        setBudgetState={setBudgetState}
        handleAddedItem={getItems}
      />

      <EditBudgetItem
        isVisible={showEditItemModal}
        setIsVisible={setShowEditItemModal}
        section={section}
        budgetItem={selectedItem}
        setBudgetState={setBudgetState}
        handleUpdateItem={getItems}
      />

      {/* <DeleteSectionModal
        isVisible={showDeleteSectionModal}
        setIsVisible={setShowDeleteSectionModal}
        handleRemoveSection={handleRemoveSection}
      /> */}

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
