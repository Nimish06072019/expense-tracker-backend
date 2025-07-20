package com.expensetraceker.expense_tracker.service;

import com.expensetraceker.expense_tracker.model.Expense;
import com.expensetraceker.expense_tracker.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository repo;

    public ExpenseService(ExpenseRepository repo) {
        this.repo = repo;
    }

    public List<Expense> getAllExpenses() {
        return repo.findAll();
    }

    public Expense addExpense(Expense ex) {
        return repo.save(ex);
    }

    public Expense updateExpense(Long id, Expense updatedExpense) {
        // Find the existing expense in the database
        Expense existingExpense = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found with id: " + id));

        // Use the public SETTER methods to update the fields
        existingExpense.setTitle(updatedExpense.getTitle());
        existingExpense.setCategory(updatedExpense.getCategory());
        existingExpense.setAmount(updatedExpense.getAmount());
        existingExpense.setDate(updatedExpense.getDate());
        existingExpense.setDescription(updatedExpense.getDescription());
        // We also need to make sure the user is not accidentally changed
        // existingExpense.setUser(updatedExpense.getUser()); // We'll handle this later

        // Save the updated expense back to the database
        return repo.save(existingExpense);
    }


    public void deleteExpense(Long id) {
        repo.deleteById(id);
    }
}
