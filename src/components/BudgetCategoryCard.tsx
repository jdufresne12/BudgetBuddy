import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import {typography, colors} from '../assets/theme.ts';
import {formatToDollar} from '../utils/textFormatting.ts';
import AddExpenseModal from './AddExpenseModal.tsx';

interface BudgetCategoryCardProps {}

function BudgetCategoryCard({}: BudgetCategoryCardProps): React.JSX.Element {
  interface SubCategories {
    icon: string | null;
    name: string;
    amount: number;
  }
  let subCategories: SubCategories[] = [
    {
      icon: 'card',
      name: 'Salary',
      amount: 100,
    },
    {
      icon: 'dice',
      name: 'Side-Hustle',
      amount: 200,
    },
  ];
  let category: string = 'Income';

  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Category Title */}
      <Text style={styles.categoryTitle}>{category}</Text>

      {/* Line Separator */}
      <View style={styles.lineSeparator} />

      {/* Category */}
      {
        subCategories.length > 0 
        ? (
          <>
            {subCategories.map((subCategory, index) => (
              <View key={index}>
                <TouchableOpacity 
                  style={styles.subCategoryContainer}
                  onPress={() => console.log(`${subCategory.name} Pressed!`)}
                >
                  <View style={styles.iconCircle}>
                    <Icon
                      name={subCategory.icon as any}
                      size={20}
                      color={colors.white}
                    />
                  </View>
                  <Text style={styles.subCategoryName}>{subCategory.name}</Text>
                  <View style={styles.subCategoryAmount}>
                    <Text style={styles.subCategoryAmountText}>
                      {formatToDollar(subCategory.amount)}
                    </Text>
                  </View>
                </TouchableOpacity>

                <View style={styles.lineSeparator} />
              </View>
            ))}
          </>
        )
        : ( <Text style={styles.noCategories}>No Categories Created</Text> )
      }

      {/* Add Category */}
      <TouchableOpacity 
        style={styles.addCategoryContainer}
        onPress={() => setIsVisible(true)}  
      >
        <View style={[styles.iconCircle, {backgroundColor: colors.empty,}]}>
          <Icon
            name='add-sharp'
            size={20}
            color={colors.black}
          />
        </View>
        <Text style={styles.subCategoryName}> Add Category</Text>
      </TouchableOpacity>

      <AddExpenseModal 
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '90%',
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
  subCategoryContainer: {
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
  subCategoryName: {
    alignSelf: 'center',
    paddingLeft: 10,
    flex: 1,  
    letterSpacing: 0.3,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeights.medium,
    fontSize: typography.sizes.body,
  },
  subCategoryAmount: {
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
  subCategoryAmountText: {
    padding: 7,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeights.heavy,
    fontSize: typography.sizes.body,
  },
  noCategories: {
    alignSelf: 'center',
    padding: 10,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeights.heavy,
    fontSize: typography.sizes.body,
    color: colors.empty
  },
  addCategoryContainer: {
    flexDirection: 'row',
    minHeight: 40,
    justifyContent: 'space-between',
    marginBottom: 20
  },
});

export default BudgetCategoryCard;
