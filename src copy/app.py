from flask import Flask, render_template, request, redirect, url_for, session, flash
from flask_mysqldb import MySQL
import MySQLdb.cursors
import re
from datetime import date, timedelta
from collections import defaultdict


app = Flask(__name__)


app.secret_key = 'your secret key'


app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'password'
app.config['MYSQL_DB'] = 'geekprofile'


mysql = MySQL(app)

@app.route('/')
def home():
    return render_template('home.html')


@app.route('/')
@app.route('/loginCustomer', methods=['GET', 'POST'])
def loginCustomer():
	msg = ''
	if request.method == 'POST' and 'full_name' in request.form and 'password' in request.form:
		username = request.form['full_name']
		password = request.form['password']
		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute(
			'SELECT * FROM customers WHERE full_name = % s \
			AND password = % s', (username, password, ))
		account = cursor.fetchone()
		if account:
			session['loggedin'] = True
			session['customer_id'] = account['cid']
			session['username'] = account['full_name']
			msg = 'Logged in successfully !'
			return render_template('index.html', msg=msg)
		else:
			msg = 'Incorrect username / password !'
	return render_template('loginCustomer.html', msg=msg)

@app.route('/loginVendor', methods=['GET', 'POST'])
def loginVendor():
	msg = ''
	if request.method == 'POST' and 'business_name' in request.form and 'password' in request.form:
		username = request.form['business_name']
		password = request.form['password']
		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute(
			'SELECT * FROM vendors WHERE business_name = % s \
			AND password = % s', (username, password, ))
		account = cursor.fetchone()
		if account:
			session['loggedin'] = True
			session['vendor_id'] = account['vendor_id']
			session['username'] = account['business_name']
			msg = 'Logged in successfully !'
			return render_template('index.html', msg=msg)
		else:
			msg = 'Incorrect username / password !'
	return render_template('loginVendor.html', msg=msg)

@app.route('/registerCustomer', methods=['GET', 'POST'])
def registerCustomer():
	msg = ''
	if request.method == 'POST' and 'full_name' in request.form and 'password' in request.form and 'email' in request.form and 'address' in request.form and 'phone' in request.form :
		username = request.form['full_name']
		password = request.form['password']
		email = request.form['email']
		address = request.form['address']
		phone = request.form['phone']
		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute(
			'SELECT * FROM customers WHERE full_name = % s', (username, ))
		account = cursor.fetchone()
		if account:
			msg = 'Account already exists !'
		elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
			msg = 'Invalid email address !'
		elif not re.match(r'[A-Za-z0-9]+', username):
			msg = 'name must contain only characters and numbers !'
		else:
			cursor.execute('INSERT INTO customers VALUES \
			(NULL, % s, % s, % s, % s, % s)',
						(username, password, email, phone, address ))
			mysql.connection.commit()
			msg = 'You have successfully registered !'
	elif request.method == 'POST':
		msg = 'Please fill out the form !'
	return render_template('registerCustomer.html', msg=msg)

@app.route('/registerVendor', methods=['GET', 'POST'])
def registerVendor():
	msg = ''
	if request.method == 'POST' and 'vendor_id' in request.form and 'business_name' in request.form and  'email_id' in request.form and 'Phone_number' in request.form and 'Location' in request.form and 'password' in request.form :
		vendor_id = request.form['vendor_id']
		business = request.form['business_name']
		email = request.form['email_id']
		phone = request.form['Phone_number']
		place = request.form['Location']
		password = request.form['password']
		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute(
			'SELECT * FROM vendors WHERE vendor_id = % s', (vendor_id, ))
		account = cursor.fetchone()
		if account:
			msg = 'Account already exists !'
		elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
			msg = 'Invalid email address !'
		elif not re.match(r'[A-Za-z0-9]+', business):
			msg = 'name must contain only characters and numbers !'
		else:
			cursor.execute('INSERT INTO vendors VALUES \
			(% s, % s, % s, % s, % s, % s)', (vendor_id, business, email, phone, place, password ))
			mysql.connection.commit()
			msg = 'You have successfully registered !'
	elif request.method == 'POST':
		msg = 'Please fill out the form !'
	return render_template('registerVendor.html', msg=msg)


@app.route('/addProduct', methods=['GET', 'POST'])
def addProduct():
	if 'loggedin' not in session or 'vendor_id' not in session:
		return redirect(url_for('loginVendor'))  
	
	msg = ''
	if request.method == 'POST' and all(k in request.form for k in ['prod_id', 'P_price', 'category','description']):
		prod_id = request.form['prod_id']
		vendor_id = session.get('vendor_id')
		if not vendor_id:
			return redirect(url_for('loginVendor'))
		P_price = request.form['P_price']
		category = request.form['category']
		description = request.form['description']

		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		
		cursor.execute('SELECT * FROM Products WHERE prod_id = %s', (prod_id,))
		existing = cursor.fetchone()
		if existing:
			msg = 'Product ID already exists!'
		else:
			cursor.execute('INSERT INTO Products (prod_id, vendor_id, P_price, category, description) VALUES (%s, %s, %s, %s, %s)',
				(prod_id, vendor_id, P_price, category, description))
			mysql.connection.commit()
			msg = 'Product added successfully!'
	
	elif request.method == 'POST':
		msg = 'Please fill all fields!'
	
	return render_template('addProduct.html', msg=msg)

@app.route('/deleteProduct', methods=['GET', 'POST'])
def deleteProduct():
	if 'loggedin' not in session or 'vendor_id' not in session:
		return redirect(url_for('loginVendor'))  # Vendor login required

	msg = ''
	if request.method == 'POST':
		prod_id = request.form['prod_id']
		vendor_id = session.get('vendor_id')
		if not vendor_id:
			return redirect(url_for('loginVendor'))

		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

		# Check if product exists and belongs to this vendor
		cursor.execute('SELECT * FROM Products WHERE prod_id = %s AND vendor_id = %s', (prod_id, vendor_id))
		product = cursor.fetchone()

		if product:
			cursor.execute('DELETE FROM Products WHERE prod_id = %s AND vendor_id = %s', (prod_id, vendor_id))
			mysql.connection.commit()
			msg = 'Product deleted successfully!'
		else:
			msg = 'No such product found for your vendor ID.'

	return render_template('deleteProduct.html', msg=msg)

@app.route('/vendor/dashboard')
def vendor_dashboard():
    if 'loggedin' not in session or 'vendor_id' not in session:
        return redirect(url_for('loginVendor'))

    vendor_id = session['vendor_id']
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    today = date.today()

    # === 1. Revenue Today ===
    cursor.execute("""
        SELECT COALESCE(SUM(price_atp * quantity), 0) AS revenue_today
        FROM order_details od
        JOIN orders o ON od.orderID = o.orderID
        WHERE od.vendor_id = %s AND DATE(o.ord_date) = %s
    """, (vendor_id, today))
    revenue_today = cursor.fetchone()['revenue_today']

    # === 2. Revenue This Week ===
    start_of_week = today - timedelta(days=today.weekday())  # Monday
    cursor.execute("""
        SELECT COALESCE(SUM(price_atp * quantity), 0) AS revenue_week
        FROM order_details od
        JOIN orders o ON od.orderID = o.orderID
        WHERE od.vendor_id = %s AND DATE(o.ord_date) BETWEEN %s AND %s
    """, (vendor_id, start_of_week, today))
    revenue_week = cursor.fetchone()['revenue_week']

    # === 3. Revenue This Month ===
    start_of_month = today.replace(day=1)
    cursor.execute("""
        SELECT COALESCE(SUM(price_atp * quantity), 0) AS revenue_month
        FROM order_details od
        JOIN orders o ON od.orderID = o.orderID
        WHERE od.vendor_id = %s AND DATE(o.ord_date) BETWEEN %s AND %s
    """, (vendor_id, start_of_month, today))
    revenue_month = cursor.fetchone()['revenue_month']

    # === 4. Revenue Trend (Last 30 Days, grouped by day) ===
    cursor.execute("""
        SELECT DATE(o.ord_date) AS day, COALESCE(SUM(price_atp * quantity), 0) AS daily_revenue
        FROM order_details od
        JOIN orders o ON od.orderID = o.orderID
        WHERE od.vendor_id = %s AND DATE(o.ord_date) >= %s
        GROUP BY day
        ORDER BY day
    """, (vendor_id, today - timedelta(days=30)))
    trend_data_raw = cursor.fetchall()

    # Format data for Chart.js
    trend_labels = []
    trend_values = []
    revenue_by_date = defaultdict(int)
    for row in trend_data_raw:
        revenue_by_date[row['day']] = row['daily_revenue']

    for i in range(30):
        d = today - timedelta(days=29 - i)
        trend_labels.append(d.strftime('%d %b'))
        trend_values.append(revenue_by_date.get(d, 0))

    return render_template('vendor_dashboard.html',
                           revenue_today=revenue_today,
                           revenue_week=revenue_week,
                           revenue_month=revenue_month,
                           trend_labels=trend_labels,
                           trend_values=trend_values)

from flask import render_template

@app.route('/products/description', methods=['GET'])
def search_by_description():
    query = request.args.get('q')
    if not query:
        return "No search keyword provided in ?q=", 400

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    try:
        cursor.execute("SELECT * FROM Products WHERE description LIKE %s", (f'%{query}%',))
        results = cursor.fetchall()
        return render_template('product_results.html', results=results)
    except MySQLdb.Error as err:
        return f"Error: {err}", 500
    finally:
        cursor.close()


@app.route('/vendors/top', methods=['GET'])
def top_vendors_by_sales():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    try:
        cursor.execute("""
            SELECT 
                v.business_name,
                SUM(od.quantity * od.price_atp) AS total_sales
            FROM order_details od
            JOIN Products p ON od.prod_id = p.prod_id
            JOIN vendors v ON p.vendor_id = v.vendor_id
            GROUP BY v.vendor_id
            ORDER BY total_sales DESC
            LIMIT 5
        """)
        result = cursor.fetchall()
        return render_template('top_vendors.html', vendors=result)
    except MySQLdb.Error as err:
        return f"Error: {err}", 500
    finally:
        cursor.close()

@app.route('/products/search', methods=['GET'])
def search_products():
    query = request.args.get('q')
    if not query:
        return render_template('error.html', message="No search query provided."), 400

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    try:
        cursor.execute("SELECT * FROM Products WHERE product_name LIKE %s", (f'%{query}%',))
        results = cursor.fetchall()
        return render_template('search_results.html', results=results)
    except MySQLdb.Error as err:
        return f"Error: {err}", 500
    finally:
        cursor.close()

@app.route('/products/category', methods=['GET'])
def filter_by_category():
    category = request.args.get('cat')
    if not category:
        return render_template('error.html', message="No category provided."), 400

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    try:
        cursor.execute("SELECT * FROM Products WHERE category = %s", (category,))
        results = cursor.fetchall()
        return render_template('category_results.html', results=results, category=category)
    except MySQLdb.Error as err:
        return f"Error: {err}", 500
    finally:
        cursor.close()

@app.route('/logout')
def logout():
    session.pop('loggedin', None)
    session.pop('username', None)
    session.pop('customer_id', None)
    session.pop('vendor_id', None)
    return redirect(url_for('loginCustomer'))

# Add these routes to your existing Flask application

@app.route('/add_to_cart', methods=['GET', 'POST'])
def add_to_cart():
    # Check if customer is logged in
    if 'loggedin' not in session or 'customer_id' not in session:
        return redirect(url_for('loginCustomer'))

    msg = ''
    if request.method == 'POST':
        try:
            # Get form data
            prod_id = request.form['prod_id']
            vendor_id = request.form['vendor_id']
            P_price = request.form['P_price']
            category = request.form['category']
            description = request.form['description']
            cid = session['customer_id']

            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            def printvendors():
                  rows=cursor.fetchall()
                  for i in rows:
                        for value in i:
                              print(value)
                        print()
            print("These are the existing vendors")
            print("choose fromt these or foreign key error")
            printvendors()

            # Create cart table if not exists (you might want to do this separately in your DB setup)
            create_cart_table = """
            CREATE TABLE IF NOT EXISTS cart (
                cart_id INT AUTO_INCREMENT PRIMARY KEY,
                P_price DECIMAL(10,2),
                prod_id INT,
                vendor_id INT,
                cid INT,
                category VARCHAR(40),
                description VARCHAR(50),
                FOREIGN KEY (prod_id) REFERENCES products(prod_id),
                FOREIGN KEY (cid) REFERENCES customers(cid),
                FOREIGN KEY (vendor_id) REFERENCES vendors(vendor_id)
            )
            """
            cursor.execute(create_cart_table)

            # Check if product already in cart
            cursor.execute("""
                SELECT * FROM cart 
                WHERE cid = %s AND prod_id = %s
            """, (cid, prod_id))
            existing_item = cursor.fetchone()

            if existing_item:
                msg = 'Product already in your cart!'
            else:
                # Insert new item to cart
                cursor.execute("""
                    INSERT INTO cart (P_price, prod_id, vendor_id, cid, category, description)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """, (P_price, prod_id, vendor_id, cid, category, description))
                mysql.connection.commit()
                msg = 'Product added to cart successfully!'

        except Exception as e:
            mysql.connection.rollback()
            msg = f'Error: {str(e)}'
        finally:
            cursor.close()

    return render_template('add_to_cart.html', msg=msg)


@app.route('/view_cart')
def view_cart():
    # Check if customer is logged in
    if 'loggedin' not in session or 'customer_id' not in session:
        return redirect(url_for('loginCustomer'))

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    try:
        # Get cart items for current customer
        cursor.execute("""
            SELECT c.*, p.prod_id, p.description as product_description, 
                   v.business_name as vendor_name
            FROM cart c
            JOIN products p ON c.prod_id = p.prod_id
            JOIN vendors v ON c.vendor_id = v.vendor_id
            WHERE c.cid = %s
        """, (session['customer_id'],))
        
        cart_items = cursor.fetchall()
        
        # Calculate total
        total = sum(float(item['P_price']) for item in cart_items) if cart_items else 0

    except Exception as e:
        flash(f'Error viewing cart: {str(e)}', 'error')
        return redirect(url_for('index'))
    finally:
        cursor.close()

    return render_template('view_cart.html', cart_items=cart_items, total=total)


@app.route('/remove_from_cart/<int:cart_id>', methods=['POST'])
def remove_from_cart(cart_id):
    # Check if customer is logged in
    if 'loggedin' not in session or 'customer_id' not in session:
        return redirect(url_for('loginCustomer'))

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    try:
        # Verify the item belongs to current customer before deleting
        cursor.execute("""
            DELETE FROM cart 
            WHERE cart_id = %s AND cid = %s
        """, (cart_id, session['customer_id']))
        
        mysql.connection.commit()
        flash('Item removed from cart successfully!', 'success')
    except Exception as e:
        mysql.connection.rollback()
        flash(f'Error removing item: {str(e)}', 'error')
    finally:
        cursor.close()

    return redirect(url_for('view_cart'))

if __name__ == "__main__":
	app.run(host="localhost", port=int("5000"))